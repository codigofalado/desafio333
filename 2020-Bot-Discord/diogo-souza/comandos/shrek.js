const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

let cooldown = false;

// Em versões do Node < 12 este comando não funciona
module.exports = {
  name: "shrek",
  description: "Assista ao filme do Shrek :D",
  aliases: ["filme", "diogoehtop"],
  emoji: ":japanese_ogre:",
  async execute(message) {
    if (cooldown) {
      message.channel.send(`Espere para utilizar este comando novamente`);
      return;
    }
    const mensagem = await message.channel.send(config.messages.waitMessage);

    const embed = await new MessageEmbed()
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
