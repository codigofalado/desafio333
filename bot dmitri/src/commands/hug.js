const { MessageEmbed } = require('discord.js');
const axios = require('axios');

const execute = async (bot, msg, args) => {

    const url = 'https://some-random-api.ml/animu/hug';

    let response, data;
    try {
        response = await axios.get(url);
        data = response.data;
    } catch (e) {
        return msg.channel.send(`Deu um erro`)
    }

    const embed = new MessageEmbed()
        .setTitle(`@${msg.author.username} abraçou @${msg.mentions.users.first().username || msg.mentions.members.first()}`)
        .setImage(data.link)

    await msg.channel.send(embed)

}

module.exports = {
    name: "hug",
    aliases: ["abraçar"],
    help: "Abraçar alguém, marque a pessoa",
    execute,

}