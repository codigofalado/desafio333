const Discord = require("discord.js");
const bot = require("../bot");

const fs = require("fs");
const config = require("../config.json");

bot.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./comandos")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`../comandos/${file}`);
  bot.commands.set(command.name, command);
}

module.exports = function getCommands(message) {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!bot.commands.has(commandName)) return;

  const command = bot.commands.get(commandName);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("Ocorreu um erro durante a execução desse comando :weary:");
  }
};
