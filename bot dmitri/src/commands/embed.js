const MessageEmbed = require("discord.js").MessageEmbed;

const execute = (bot, msg, args) => {
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Seja bem-vindo, ${msg.author.username}!`)
        .setURL("https://twitch.tv/dmitritv")
        .setAuthor(
            "DmitriTV",
            `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`);
    msg.channel.send(embed);
};

module.exports = {
    name: "embed",
    help: "Retorna uma Mensagem informativa",
    execute,
};