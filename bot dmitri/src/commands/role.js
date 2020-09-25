const MessageEmbed = require("discord.js").MessageEmbed;

async function execute(bot, msg, args) {
    try {
        let { cache } = msg.guild.roles;

        if (!msg.member.hasPermission(["MANAGE_ROLES"])) {
            return msg.channel.send({ embed: { color: "RED", description: "Você não tem permissão para esse comando!" } })

        } else {

            const [mention, roleArg] = args;
            console.log(args)
            const member = msg.mentions.members.first();
            if (!member)
                return msg.reply("você precisa mencionar a quem deseja dar o cargo.");
            if (!roleArg) return msg.reply("você precisa escolher um cargo");
            // const IDR = resolveID(roleArg);
            // console.log(IDR)
            const p = msg. guild.roles.resolveID(roleArg)
            if(p){
                console.log("Achei o cargo")
                console.log(p.substr(2))
                
            }
            const id1 = p.substr(2);
            const x = (id1.length) - 1;
            const id2 = id1.substr(1, (id1.length) - 2);
            console.log(id2)
            const role = msg.guild.roles.cache.find((r) => r.name === roleArg || r.id === id2);
            if (!role) return msg.reply(`não encontrei o cargo \`${roleArg}\``);
            member.roles.add(role);
            msg.channel.send(`${member} agora tem o cargo ${role} ✅`)
        }
    } catch (e) {
        console.error(e);
        msg.channel.send("Não consigo fazer isso em um cargo acima ou igual ao meu");
    }

};

module.exports = {
    name: "role",
    help: "Atribui cargos a um usuário, use .role [@user] [@cargo]",
    execute,
};