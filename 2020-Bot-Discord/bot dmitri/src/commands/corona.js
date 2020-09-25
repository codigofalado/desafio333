const MessageEmbed = require("discord.js").MessageEmbed;

const axios = require('axios');

async function execute (bot, msg, args) {
    const dadosAPI = await buscaDadosAPI();
    const embed = new MessageEmbed()
        .setTitle("Status do Corona Virus no Brasil")
        .setDescription("Mostra os números de casos confirmados e não confirmados, mortes e curados")
        .addFields(
            { name: `Casos = ${dadosAPI.NCases}`,value:"🤢" },
            { name: `Confirmados = ${dadosAPI.NConfirmed}`, value: "😷" },
            { name: `Mortes = ${dadosAPI.NDeath}`, value: "💀" },
            { name: `Curados = ${dadosAPI.NRecovered}`, value: "👌" },
            { name: `Dados atualizados em = ${dadosAPI.Updated}`, value:"🗓"}
        )
    msg.channel.send(embed);
}
const buscaDadosAPI = async () => {


    try {
        const resultado = await axios.get("https://covid19-brazil-api.now.sh/api/report/v1/brazil");

        const { cases: NCases, confirmed: NConfirmed, deaths: NDeath, recovered: NRecovered, updated_at: Updated } = resultado.data.data;

        return {
            NCases,
            NConfirmed,
            NDeath,
            NRecovered,
            Updated
        }
    } catch (erro) {
        console.log(erro);
    }
}

module.exports = {
    name: "corona",
    help: "Retorna o status do corona virus no Brasil",
    execute,
};
