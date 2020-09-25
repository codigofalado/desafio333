const { MessageEmbed } = require('discord.js');
const axios = require('axios');

const execute = async (bot, message, args) => {
    const url = `http://some-random-api.ml/binary?text=${args}`;

    let response, data;
    try {
        response = await axios.get(url);
        data = response.data;
    } catch (e) {
        return message.channel.send(`Deu um erro, tente novamente`)
    }

    const embed = new MessageEmbed()
        .setTitle('Texto para Binario')
        .setDescription(data.binary)

    await message.channel.send(embed)

}

module.exports = {
    name: "binario",
    aliases: ["binary"],
    help: "Converte o texto para binario",
    execute,
}