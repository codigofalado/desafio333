const Discord = require("discord.js");
const config = require("../config.json");

const Twitch = require("twitch.tv-api");
const twitch = new Twitch({
  id: process.env.TWITCH_CLIENT_ID,
  secret: process.env.TWITCH_SECRET_KEY,
});

let TwitchStream = false;

function SendMessagesToGroups(client, dataStream, notEmbedMessage) {
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
          `${display_name} está online na Twitch agora! Venha conferir:`
        )
        .setImage(medium);

      notEmbedMessage ? channel.send(notEmbedMessage, msg) : channel.send(msg);
    });
  });
}

module.exports = function twitchNotifier(bot) {
  setInterval(async () => {
    if (config.twitchNotifier.actived) {
      let data = await twitch.getUser(config.twitchNotifier.channelName);
      if (data.stream && !TwitchStream && data.stream.stream_type === "live") {
        config.twitchNotifier.messages.notEmbed
          ? SendMessagesToGroups(
              bot,
              data.stream,
              config.twitchNotifier.messages.notEmbed
            )
          : SendMessagesToGroups(bot, data.stream);
        TwitchStream = true;
        return;
      }
      if (!data.stream && TwitchStream) {
        TwitchStream = false;
      }
    }
  }, 1000 * config.twitchNotifier.delayToVerify);
};
