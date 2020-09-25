const { MessageEmbed } = require('discord.js');
const axios = require('axios');

const execute = async (bot, message, args) => {
    const user = message.mentions.users.first()
        ? message.mentions.users.first()
        : message.author
    const userAvatar = user.avatarURL({
        format: 'png',
        dynamic: true,
        size: 1024
    })
    const url = 'https://some-random-api.ml/canvas/wasted?avatar=' + userAvatar
    // message.channel.send(url)
    const embed = new MessageEmbed()
        .setImage(url)
    message.channel.send(embed)
}


module.exports = {
    name: "wasted",
    help: "Deixa a imagem com o wasted",
    execute,
}