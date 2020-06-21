require("dotenv/config");
const fs = require("fs");
const config = require("./config.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const Twitch = require("twitch.tv-api");
const twitch = new Twitch({
  id: process.env.TWITCH_CLIENT_ID,
  secret: process.env.TWITCH_SECRET_KEY,
});

let TwitchStream = false;

const commandFiles = fs
  .readdirSync("./comandos")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./comandos/${file}`);
  bot.commands.set(command.name, command);
}

function SendMessagesToGroups(client, dataStream) {
  const channels = config.twitchNotifier.idCanais;
  const {
    channel: {
      status,
      display_name,
      logo,
      url,
      profile_banner_background_color,
    },
    preview: { medium },
  } = dataStream;

  channels.map((channelFromConfig) => {
    client.channels.fetch(channelFromConfig).then((channel) => {
      const msg = new Discord.MessageEmbed()
        .setColor(
          profile_banner_background_color === ""
            ? "#0099ff"
            : profile_banner_background_color
        )
        .setTitle(status)
        .setURL(url)
        .setAuthor(display_name, logo, url)
        .setDescription(
          `${display_name} está online na Twitch agora! Venha conferir.`
        )
        .setImage(medium);
      channel.send(msg);
    });
  });
}

// Bot de notificação da twitch
bot.on("ready", () => {
  console.log(`O bot foi iniciado`);
  setInterval(async () => {
    if (config.twitchNotifier.actived) {
      let data = await twitch.getUser(config.twitchNotifier.channelName);
      if (data.stream && !TwitchStream && data.stream.stream_type === "live") {
        SendMessagesToGroups(bot, data.stream);
        TwitchStream = true;
        return;
      }
      if (!data.stream && TwitchStream) {
        TwitchStream = false;
      }
    }
  }, 1000 * 60);
});

bot.on("message", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!bot.commands.has(commandName)) return;

  const command = bot.commands.get(commandName);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

bot.login(process.env.TOKEN);
