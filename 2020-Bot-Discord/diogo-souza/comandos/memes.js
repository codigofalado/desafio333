const Discord = require("discord.js");
const axios = require("axios");
const config = require("../config.json");

// Em versões do Node < 12 este comando não funciona
module.exports = {
  name: "memes",
  description: "Lista todos os memes disponíveis",
  async execute(message) {
    const getMemes = `https://api.imgflip.com/get_memes`;

    const mensagem = await message.channel.send(config.messages.waitMessage);

    const {
      data: {
        data: { memes },
      },
    } = await axios.get(getMemes);

    const memes1 = memes.slice(0, 6);

    const embed = await new Discord.MessageEmbed()
      .setTitle("Lista de memes:")
      .setDescription(
        `Digite ${config.prefix}meme [ID] [Campos de texto]. Ex: "${config.prefix}meme 181913649 Texto1 Texto2"`
      )
      .setColor("#0099ff")
      .setURL(getMemes);
    memes1.map((meme) => {
      embed.addField(
        `${meme.name} (${meme.box_count} campos)`,
        `[${config.prefix}meme ${meme.id}](${meme.url})`,
        true
      );
    });
    mensagem.edit(config.messages.finishedMessage, embed);
  },
};
