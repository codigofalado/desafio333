const axios = require('axios')
const { MessageEmbed } = require('discord.js');

async function execute(bot, msg, args) {
    try {
        const a = args.join(" ");
        const dadosAPI = await buscaDadosAPI(a);
        const embed = new MessageEmbed()
            .setTitle(`${dadosAPI.Verified ? `${dadosAPI.UserName} <a:verified:727820439497211994>` : ` ${dadosAPI.UserName}`} ${dadosAPI.Private ? '🔒' : ''} `)
            .setDescription(dadosAPI.Biography)
            .setThumbnail(dadosAPI.ProfilePic)
            .addFields(
                {
                    name: "Publicações",
                    value: dadosAPI.Publicacoes.toLocaleString(),
                    inline: true
                },
                {
                    name: "Seguidores",
                    value: dadosAPI.Seguidores.toLocaleString(),
                    inline: true
                },
                {
                    name: "Seguindo",
                    value: dadosAPI.Seguindo.toLocaleString(),
                    inline: true
                }
            )
        await msg.channel.send(embed)
    } catch (error) {
        return msg.channel.send(`${error}`)
    }
}
const buscaDadosAPI = async (a) => {
    try {
        var url = `https://instagram.com/${encodeURI(a)}/?__a=1`;
        const resultado = await axios({
            "method": "GET",
            "url": `${url}`,
            "headers": {
                "accept": "application/json",
            }
        });
        console.log(resultado.data)
        const { is_verified: Verified, username: UserName, is_private: Private, biography: Biography, profile_pic_url: ProfilePic } = resultado.data.graphql.user;
        const { count: Publicacoes } = resultado.data.graphql.user.edge_owner_to_timeline_media;
        const { count: Seguidores } = resultado.data.graphql.user.edge_followed_by;
        const { count: Seguindo } = resultado.data.graphql.user.edge_follow;
        return {
            Verified,
            UserName,
            Private,
            Biography,
            ProfilePic,
            Publicacoes,
            Seguidores,
            Seguindo
        }
    } catch (erro) {
        console.log(erro);
    }
}


module.exports = {
    name: "testar",
    aliases: ["testando"],
    help: "Mostra as informações do usuario do instagram",
    execute,

}