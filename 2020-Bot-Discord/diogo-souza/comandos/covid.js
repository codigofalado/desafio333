const Discord = require("discord.js");
const axios = require("axios");
const numeral = require("numeral");

// Em versões do Node < 12 este comando não funciona
module.exports = {
  name: "covid",
  description:
    "Digite este comando para acompanhar os casos de Covid-19 no Brasil!",
  async execute(message) {
    const apiTotal = "https://covid19-brazil-api.now.sh/api/report/v1/brazil";

    const mensagem = await message.channel.send("Aguarde...");

    const {
      data: { data },
    } = await axios.get(apiTotal);
    const total = numeral(data.confirmed).format("0,000,000");
    const deaths = numeral(data.deaths).format("0,000,000");
    const recovered = numeral(data.recovered).format("0,000,000");

    const embed = await new Discord.MessageEmbed()
      .setTitle("Casos de Covid-19 no Brasil")
      .setDescription(
        `Aqui estão os principais dados sobre o covid-19 no Brasil`
      )
      .setColor("#0099ff")
      .setURL(apiTotal)
      .addFields(
        { name: "🆕 Total de casos", value: total, inline: true },
        { name: "💀 Total de mortos", value: deaths, inline: true },
        { name: "🇨🇭 Total de recuperados", value: recovered, inline: true }
      );
    mensagem.edit("Dados do Covid-19 do Brasil hoje: ", embed);
  },
};
