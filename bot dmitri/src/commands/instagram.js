const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

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
                    name: "Nome Completo",
                    value: dadosAPI.FullName,
                    inline: true
                },
                {
                    name: "Seguidores",
                    value: dadosAPI.Seguidores,
                    inline: true
                },
                {
                    name: "Seguindo",
                    value: dadosAPI.Seguindo,
                    inline: true
                },
                {
                    name: "Perfil de negócios",
                    value: dadosAPI.T,
                    inline: true
                },
                {
                    name: "Categoria ",
                    value: dadosAPI.Categoria,
                    inline: true
                },
            )
        await msg.channel.send(embed)

    } catch (error) {
        msg.channel.send('Invalid username')
    }
}
const buscaDadosAPI = async (a) => {
    try {



        const resultado = await axios({
            "method": "GET",
            "url": "https://instagram-profile-picture1.p.rapidapi.com/api/v1/profile/data",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "instagram-profile-picture1.p.rapidapi.com",
                "x-rapidapi-key": "3da1d5bb6dmsh1efbd62e8c685aep18e4f0jsn3b27a822a344",
                "useQueryString": true
            }, "params": {
                "username": `${a}`,
            }
        })
        const ta = resultado.data;
        console.log(ta)
        console.log(resultado)
        let { isVerified: Verified, username: UserName, isPrivate: Private, biography: Biography, profilePicUrl: ProfilePic, isBusinessAccount: Business, fullName: FullName, businessCategoryName: Categoria } = resultado.data.data.graphql.user;
        // const { count: Publicacoes } = resultado.data.graphql.user.edge_owner_to_timeline_media;
        const { count: Seguidores } = resultado.data.data.graphql.user.igQueryEdgeFollowedBy;
        const { count: Seguindo } = resultado.data.data.graphql.user.igQueryEdgeFollow;
        const teste = "Sem nenhuma categoria";


        if (Business != true) {
            const T = "Não"
            const C = "Sem nenhuma categoria"
            Categoria = C;
            return {
                Verified,
                UserName,
                Private,
                Biography,
                ProfilePic,
                Seguidores,
                Seguindo,
                T,
                FullName,
                Categoria
            }
        } else {
            const T = "Sim";
            return {
                Verified,
                UserName,
                Private,
                Biography,
                ProfilePic,
                Seguidores,
                Seguindo,
                T,
                FullName,
                Categoria
            }
        }
    } catch (err) {
        console.log('Invalid username')
    }
}


module.exports = {
    name: "instagram",
    aliases: ["insta"],
    help: "Mostra as informações do usuario do instagram, comando em beta",
    execute,

}