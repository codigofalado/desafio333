const got = require('got');
const MessageEmbed = require("discord.js").MessageEmbed;

const execute = (bot, msg, args) => {

    got('https://www.reddit.com/r/MemesBrasil/random/.json').then(response => {
        let content = JSON.parse(response.body),
            image = content[0].data.children[0].data.url,
            embed = new MessageEmbed()
                .setImage(image)
                .setTimestamp()
                .setFooter('from: r/memesBrasil')
        msg.channel.send(embed);
    }).catch(console.log)
}

module.exports = {
    name: "memes",
    aliases: ["meme"],
    help: "Retorna um meme aleatório do reddit",
    execute,
};