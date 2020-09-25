const Discord = require("discord.js")
const MessageEmbed = require("discord.js").MessageEmbed;

async function execute(bot, msg, args) {

    try {
        if (!msg.member.hasPermission(["MANAGE_NICKNAMES"])) {
            return msg.channel.send({ embed: { color: "RED", description: "Você não tem permissão para esse comando!" } })

        }

        let user = msg.mentions.users.first();
        if (!user) return msg.channel.send({ embed: { color: "RED", description: "Você precisa marcar o usuário" } })

        let nick = args.slice(1).join(" ");
        if (!nick) return msg.channel.send({ embed: { color: "RED", description: "Precisa colocar o nick!" } })

        let member = msg.guild.members.cache.get(user.id);

        await member.setNickname(nick);

        return msg.channel.send({ embed: { color: "GREEN", description: `O nick **${user.tag}** foi mudado para **${nick}**` } })
    } catch (erro) {
        console.log(erro);
       msg.channel.send("Não consigo fazer isso em um cargo acima ou igual ao meu");
    }
}

module.exports = {
    name: "nick",
    help: "Muda o nick de um usuário",
    execute,
}