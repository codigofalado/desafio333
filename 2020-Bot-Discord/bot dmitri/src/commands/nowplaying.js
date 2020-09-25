const { Utils } = require("erela.js")
const { RichEmbed } = require("discord.js")
const MessageEmbed = require("discord.js").MessageEmbed;

const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);

    if (!queue) {
        return msg.reply("Não existe nenhuma musica na fila seu animal");
    }
    const np = queue.songs[0].title;
    const song = queue.songs[0]
    const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setAuthor(
            "Está tocando agora ♪ ...",
            "https://media.giphy.com/media/ccu9c0Iu7aGFa/giphy.gif"
        )
        .setTitle(`${np}`)
        .setURL(song.url)
        .setThumbnail(song.thumbnail)
        
    // .setTitle(`:arrow_forward: ${np}`);

    //return msg.reply(np);
    msg.channel.send(embed);

};

module.exports = {
    name: "np",
    aliases: ["nowplaying"],
    help: "Pausa a reprodução de música atual",
    execute,
};