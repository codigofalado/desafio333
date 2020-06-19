const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");

let cooldown = false;

// Em versões do Node < 12 este comando não funciona
module.exports = {
  name: "shrek",
  description: "Digite este comando e receba um GIF do filme do Shrek inteiro!",
  async execute(message) {
    if (cooldown) {
      message.channel.send(`Espere para utilizar este comando novamente`);
      return;
    }
    const mensagem = await message.channel.send(config.messages.waitMessage);

    const embed = await new Discord.MessageEmbed()
      .setTitle("Assista ao filme:")
      .setColor("#265C80")
      .setImage("https://i.imgur.com/t4abUaz.gif");
    mensagem.edit(config.messages.finishedMessage, embed);
    cooldown = true;
    setTimeout(() => {
      cooldown = false;
    }, 60000);
  },
};
