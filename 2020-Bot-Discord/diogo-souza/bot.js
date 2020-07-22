require("dotenv/config");

const Discord = require("discord.js");
const bot = new Discord.Client();

const twitchNotifier = require("./utils/TwitchLoop");
const getCommands = require("./utils/getCommands");

bot.on("ready", async () => {
  console.log(`O bot foi iniciado`);
  // Inicia o verificador de canais da Twitch
  twitchNotifier(bot);
});

bot.on("message", (message) => {
  // Carrega a função que carrega todos os comandos da pasta ./comandos/
  getCommands(message);
});

bot.login(process.env.TOKEN);

module.exports = bot;
