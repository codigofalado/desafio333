const MessageEmbed = require("discord.js").MessageEmbed;
const genius = require("genius-lyrics")
const G = new genius.Client(process.env.GENIUS)

const execute = (bot,msg,args) => {

G.tracks.search(msg.content.split(' ').slice(1).join(' '), {limit: 1})
    .then(results => {
        const song = results[0]
        msg.channel.send(`**${song.artist.name} - ${song.title}**\n<${song.url}>`)
    })
    .catch(err => msg.reply(err))
}

module.exports = {
    name:"letra",
    help:"Mostra a letra das musicas, use .letra + nome da musica e artista",
    execute,
};