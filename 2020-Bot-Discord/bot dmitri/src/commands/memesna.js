const got = require('got');
const MessageEmbed = require("discord.js").MessageEmbed;

const execute = (bot, msg, args) => {

    got('https://www.reddit.com/r/Memes/random/.json').then(response => {
        let content = JSON.parse(response.body),
            image = content[0].data.children[0].data.url,
            embed = new MessageEmbed()
                .setImage(image)
                .setTimestamp()
                .setFooter('from: r/meme')
        msg.channel.send(embed);
    }).catch(console.log)
}

module.exports = {
    name: "memeNA",
    alieases: ["memena", "memesna","memesNA"],
    help: "Mostra um meme gringo! N/A meu consagrado.",
    execute,
};