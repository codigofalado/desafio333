const Discord = require("discord.js");
const config = require("../config.json");

const { rastro } = require("rastrojs");

// Em versões do Node < 12 este comando não funciona
module.exports = {
  name: "rastrear",
  description: "Rastreie suas encomendas do Correios",
  aliases: ["rastreio", "correios", "encomenda"],
  emoji: ":truck:",
  async execute(message) {
    let args = Array.from(message.content.split(" "));
    const mensagem = await message.channel.send(config.messages.waitMessage);

    if (args.length < 3) {
      mensagem.edit(
        `${message.author}, comando incorreto. Utilize "!s rastreio [Código de rastreamento]"`
      );
      return;
    }

    const data = await rastro.track(args[2]);
    const track = data[0];
    if (track.isInvalid && track.isInvalid === true) {
      mensagem.edit(`${message.author}, código de rastreio inválido.`);
      return;
    }
    const { tracks, code, isDelivered } = track;
    const embed = await new Discord.MessageEmbed()
      .setTitle("Rastreamento")
      .setDescription(`Rastreio do pedido ${code}`)
      .setColor("#0099ff");
    if (isDelivered) {
      // Objeto entregue
      mensagem.edit(
        `${message.author}, seu pedido já foi entregue! :partying_face:`
      );
    } else {
      // Objetos a caminho
      const { locale, observation } = tracks[tracks.length - 1];
      if (observation) {
        const to = observation.split("para");
        embed.addFields({
          name: "Seu pedido está a caminho!",
          value: `Objeto encaminhado para ${to[1]}`,
          inline: true,
        });
        mensagem.edit(
          `${message.author}, seu pedido já está a caminho! :partying_face:`,
          embed
        );
      } else {
        // Objeto que acabou de ser postado
        embed.addFields({
          name: "Seu pedido foi postado!",
          value: `Objeto postado em ${locale}`,
          inline: true,
        });
        mensagem.edit(
          `${message.author}, seu pedido já foi postado :smiley:`,
          embed
        );
      }
    }
  },
};
