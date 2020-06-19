const Discord = require("discord.js");
const axios = require("axios");
const numeral = require("numeral");

// Em versões do Node < 12 este comando não funciona
module.exports = {
  name: "cotacao",
  description:
    "Digite este comando para acompanhar a cotação das moedas em Reais!",
  async execute(message) {
    const apiTotal = `https://economia.awesomeapi.com.br/json/all/USD-BRL,EUR-BRL,BTC-BRL,CAD-BRL`;

    const mensagem = await message.channel.send("Aguarde...");

    const {
      data: { USD, EUR, BTC, CAD },
    } = await axios.get(apiTotal);

    const embed = await new Discord.MessageEmbed()
      .setTitle("Cotação das principais moedas em Reais:")
      .setColor("#0099ff")
      .setURL(apiTotal)
      .addFields(
        { name: "Dolar", value: `R$ ${USD.bid}`, inline: true },
        { name: "Euro", value: `R$ ${EUR.bid}`, inline: true },
        { name: "Bitcoin", value: `R$ ${BTC.bid}`, inline: true },
        { name: "Dolar canadense", value: `R$ ${CAD.bid}`, inline: true }
      );
    mensagem.edit("Dados do Covid-19 do Brasil hoje: ", embed);
  },
};
