const { MessageEmbed, MessageAttachment } = require('discord.js');
const axios = require('axios');
const Discord = require("discord.js");
const fetch = require("node-fetch");

const execute = async (bot, message, args) => {
    try {
        // await message.delete()
        const user = message.mentions.users.first()
            ? message.mentions.users.first()
            : message.author
        const userAvatar = user.avatarURL({
            format: 'png',
            dynamic: true,
            size: 1024
        })
        // var joinargs = args.join(" ");
        // if (joinargs.length > 75) {
        //     message.channel.send(" Muito grande! Tente escrever menos que 75 caracteres");
        //     return;
        // }

        if (user) {
            const argsWithoutMentions = []
            const mentions = []

            for (const arg of args) {
                if (Discord.MessageMentions.USERS_PATTERN.test(arg)) mentions.push(arg)
                else argsWithoutMentions.push(arg)
            }
            const url =

                'https://some-random-api.ml/canvas/youtube-comment?comment=' +
                encodeURIComponent(argsWithoutMentions.join(' ')) + encodeURI(
                    '&username=' +
                    user.username +
                    '&avatar=' +
                    userAvatar +
                    "&dark=true");

            const attachment = new Discord.MessageAttachment(url, 'comment.png')
            message.channel.send(message.author, attachment)
        }
    } catch (error) {
        console.error(error)
    }

}

module.exports = {
    name: "youtube",
    help: "Finge um comentário do youtube, escreva .youtube [texto] / se quiser colocar como sendo outro usuario é do mesmo jeito. @[use] [texto]",
    execute,
}