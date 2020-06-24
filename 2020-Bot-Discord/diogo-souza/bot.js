require("dotenv/config");

const Discord = require("discord.js");
const bot = new Discord.Client();
const { rastro } = require("rastrojs");

const twitchNotifier = require("./utils/ready");
const getCommands = require("./utils/getCommands");

bot.on("ready", async () => {
  console.log(`O bot foi iniciado`);
  twitchNotifier(bot);
});

bot.on("message", (message) => {
  getCommands(message);
});

bot.login(process.env.TOKEN);

module.exports = bot;
