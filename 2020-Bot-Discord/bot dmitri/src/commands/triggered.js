const { MessageEmbed } = require('discord.js');
const axios = require('axios');

const execute = async (bot, message, args) => {
    let nsg = await message.channel.send("Criando...");
    const user = message.mentions.users.first()
        ? message.mentions.users.first()
        : message.author
    const userAvatar = user.avatarURL({
        format: 'png',
        dynamic: true,
        size: 1024
    })
    const url = 'https://some-random-api.ml/canvas/triggered?avatar=' + userAvatar
    // message.channel.send(url)
    const embed = new MessageEmbed()
        .setAuthor(`${user.username} is trigered!!!`, bot.user.displayAvatarURL())
        .setImage(url)
        .setFooter(`${bot.user.username} | By Bruno Gomes  -ΔŁŦ-#6519`, bot.user.displayAvatarURL());

    message.channel.send(embed)

    nsg.delete();

}


module.exports = {
    name: "triggered",
    aliases: ["testando"],
    help: "Deixa a imagem toda bugada com o triggered kk",
    execute,
}