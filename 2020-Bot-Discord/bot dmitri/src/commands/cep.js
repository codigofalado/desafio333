const MessageEmbed = require("discord.js").MessageEmbed;

const axios = require('axios');


async function execute(bot, msg, args) {

    try {
        const s = args.join(" ");
        if (isNumber(s) == true) {
            // 

            const p = await buscaDadosAPI(s);
            const embed = new MessageEmbed()
                .setTitle("Mostra o endereço do CEP")
                .addFields(
                    { name: `CEP: ${p.CEP}`, value: "⠀" },
                    { name: `Rua: ${p.Rua}`, value: "⠀" },
                    { name: `Cidade: ${p.Cidade}`, value: "⠀" },
                    { name: `Bairro: ${p.Bairro}`, value: "⠀" },
                    { name: `Estado: ${p.Estado}`, value: "⠀" },
                    { name: `Código no IBGE: ${p.Cod}`, value: "⠀" },
                )
                .setThumbnail("https://media.giphy.com/media/9JgeSP0jlRAVBOG9FD/giphy.gif")
            msg.channel.send(embed)
        } else {
            msg.reply("Insira só com números, sem usar os pontos e traço [ . ] e [ - ] ");
        }

    } catch (error) {
        console.log(error)
    }
}
const buscaDadosAPI = async (s) => {

    // // cep: '29024-555',
    //   logradouro: 'Rua Flor de Lírio',
    //   complemento: '',
    //   bairro: 'Universitário',
    //   localidade: 'Vitória',
    //   uf: 'ES',
    //   unidade: '',
    //   ibge: '3205309',
    //   gia: ''
    try {
        const link = `https://viacep.com.br/ws/${encodeURI(s)}/json/`
        console.log(link)
        const resultado = await axios.get(link);

        const { cep: CEP, logradouro: Rua, bairro: Bairro, localidade: Cidade, uf: Estado, ibge: Cod } = resultado.data;

        return {
            CEP,
            Rua,
            Bairro,
            Cidade,
            Estado,
            Cod
        }
    } catch (erro) {
        console.log(erro);
    }
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = {
    name: "cep",
    help: "Mostra o endereço pelo seu CEP, sem os PONTOS",
    execute,
}