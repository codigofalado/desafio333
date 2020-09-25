const MessageEmbed = require("discord.js").MessageEmbed;
const Discord = require("discord.js");
const axios = require("axios");


async function execute(bot, msg, args) {
    try {
        // Dolar, Euro, DolarTurismo, DolarCad, Libra, Bitcoin,LiteCoin, Iene, Franco, Peso
        const s = args.join(" ");
        switch (s) {
            case 'dolar':
                const DDolar = await Dolar();
                const embed = new MessageEmbed()
                    .setTitle("Mostra a cotação da moeda em tempo real")
                    .addFields(
                        { name: `Moeda: ${DDolar.NomeM}`, value: "⠀" },
                        { name: `Compra: R$${DDolar.Compra}`, value: "⠀" },
                        { name: `Venda: R$${DDolar.Venda}`, value: "⠀" },
                        { name: `Variação: ${DDolar.Variacao}%`, value: "⠀" },
                        { name: `Porcentagem de variacao: ${DDolar.PorCento}%`, value: "⠀"},
                        { name: `Maximo: R$${DDolar.Max}`, value: "⠀" },
                        { name: `Minima: R$${DDolar.Min}`, value: "⠀" },
                    )
                    .setThumbnail("https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif")
                msg.channel.send(embed)
                break;
            case 'euro':
                const DEuro = await Euro();
                const embedeuro = new MessageEmbed()
                    .setTitle("Mostra a cotação da moeda em tempo real")
                    .addFields(
                        { name: `Moeda: ${DEuro.NomeM}`, value: "⠀" },
                        { name: `Compra: R$${DEuro.Compra}`, value: "⠀" },
                        { name: `Venda: R$${DEuro.Venda}`, value: "⠀" },
                        { name: `Variação: ${DEuro.Variacao}%`, value: "⠀" },
                        { name: `Porcentagem de variacao: ${DEuro.PorCento}%`, value: "⠀"},
                        { name: `Maximo: R$${DEuro.Max}`, value: "⠀" },
                        { name: `Minima: R$${DEuro.Min}`, value: "⠀" },
                    )
                    .setThumbnail("https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif")
                msg.channel.send(embedeuro)
                break;
            case 'turismo':
                const DDolarTurismo = await DolarTurismo();
                const embedtur = new MessageEmbed()
                    .setTitle("Mostra a cotação da moeda em tempo real")
                    .addFields(
                        { name: `Moeda: ${DDolarTurismo.NomeM}`, value: "⠀" },
                        { name: `Compra: R$${DDolarTurismo.Compra}`, value: "⠀" },
                        { name: `Venda: R$${DDolarTurismo.Venda}`, value: "⠀" },
                        { name: `Variação: ${DDolarTurismo.Variacao}%`, value: "⠀" },
                        { name: `Porcentagem de variacao: ${DDolarTurismo.PorCento}%`, value: "⠀"},
                        { name: `Maximo: R$${DDolarTurismo.Max}`, value: "⠀" },
                        { name: `Minima: R$${DDolarTurismo.Min}`, value: "⠀" },
                    )
                    .setThumbnail("https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif")
                msg.channel.send(embedtur)
                break;
            case 'canada':
                const DDolarCad = await DolarCad();
                const embedcan = new MessageEmbed()
                    .setTitle("Mostra a cotação da moeda em tempo real")
                    .addFields(
                        { name: `Moeda: ${DDolarCad.NomeM}`, value: "⠀" },
                        { name: `Compra: R$${DDolarCad.Compra}`, value: "⠀" },
                        { name: `Venda: R$${DDolarCad.Venda}`, value: "⠀" },
                        { name: `Variação: ${DDolarCad.Variacao}%`, value: "⠀" },
                        { name: `Porcentagem de variacao: ${DDolarCad.PorCento}%`, value: "⠀"},
                        { name: `Maximo: R$${DDolarCad.Max}`, value: "⠀" },
                        { name: `Minima: R$${DDolarCad.Min}`, value: "⠀" },
                    )
                    .setThumbnail("https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif")
                msg.channel.send(embedcan)
                break;
            case 'libra':
                const DLibra = await Libra();
                const embedlib = new MessageEmbed()
                    .setTitle("Mostra a cotação da moeda em tempo real")
                    .addFields(
                        { name: `Moeda: ${DLibra.NomeM}`, value: "⠀" },
                        { name: `Compra: R$${DLibra.Compra}`, value: "⠀" },
                        { name: `Venda: R$${DLibra.Venda}`, value: "⠀" },
                        { name: `Variação: ${DLibra.Variacao}%`, value: "⠀" },
                        { name: `Porcentagem de variacao: ${DLibra.PorCento}%`, value: "⠀"},
                        { name: `Maximo: R$${DLibra.Max}`, value: "⠀" },
                        { name: `Minima: R$${DLibra.Min}`, value: "⠀" },
                    )
                    .setThumbnail("https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif")
                msg.channel.send(embedlib)
                break;
            case 'bitcoin':
                const DBitcoin = await Bitcoin();
                const embedbit = new MessageEmbed()
                    .setTitle("Mostra a cotação da moeda em tempo real")
                    .addFields(
                        { name: `Moeda: ${DBitcoin.NomeM}`, value: "⠀" },
                        { name: `Compra: R$${DBitcoin.Compra}`, value: "⠀" },
                        { name: `Venda: R$${DBitcoin.Venda}`, value: "⠀" },
                        { name: `Variação: ${DBitcoin.Variacao}%`, value: "⠀" },
                        { name: `Porcentagem de variacao: ${DBitcoin.PorCento}%`, value: "⠀"},
                        { name: `Maximo: R$${DBitcoin.Max}`, value: "⠀" },
                        { name: `Minima: R$${DBitcoin.Min}`, value: "⠀" },
                    )
                    .setThumbnail("https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif")
                msg.channel.send(embedbit)
                break;
            case 'litecoin':
                const DLiteCoin = await LiteCoin();
                const embedlite = new MessageEmbed()
                    .setTitle("Mostra a cotação da moeda em tempo real")
                    .addFields(
                        { name: `Moeda: ${DLiteCoin.NomeM}`, value: "⠀" },
                        { name: `Compra: R$${DLiteCoin.Compra}`, value: "⠀" },
                        { name: `Venda: R$${DLiteCoin.Venda}`, value: "⠀" },
                        { name: `Variação: ${DLiteCoin.Variacao}%`, value: "⠀" },
                        { name: `Porcentagem de variacao: ${DLiteCoin.PorCento}%`, value: "⠀"},
                        { name: `Maximo: R$${DLiteCoin.Max}`, value: "⠀" },
                        { name: `Minima: R$${DLiteCoin.Min}`, value: "⠀" },
                    )
                    .setThumbnail("https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif")
                msg.channel.send(embedlite)
                break;
            case 'iene':
                const DIene = await Iene();
                const embedie = new MessageEmbed()
                    .setTitle("Mostra a cotação da moeda em tempo real")
                    .addFields(
                        { name: `Moeda: ${DIene.NomeM}`, value: "⠀" },
                        { name: `Compra: R$${DIene.Compra}`, value: "⠀" },
                        { name: `Venda: R$${DIene.Venda}`, value: "⠀" },
                        { name: `Variação: ${DIene.Variacao}%`, value: "⠀" },
                        { name: `Porcentagem de variacao: ${DIene.PorCento}%`, value: "⠀"},
                        { name: `Maximo: R$${DIene.Max}`, value: "⠀" },
                        { name: `Minima: R$${DIene.Min}`, value: "⠀" },
                    )
                    .setThumbnail("https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif")
                msg.channel.send(embedie)
                break;
            case 'franco':
                const DFranco = await Franco();
                const embedfr = new MessageEmbed()
                    .setTitle("Mostra a cotação da moeda em tempo real")
                    .addFields(
                        { name: `Moeda: ${DFranco.NomeM}`, value: "⠀" },
                        { name: `Compra: R$${DFranco.Compra}`, value: "⠀" },
                        { name: `Venda: R$${DFranco.Venda}`, value: "⠀" },
                        { name: `Variação: ${DFranco.Variacao}%`, value: "⠀" },
                        { name: `Porcentagem de variacao: ${DFranco.PorCento}%`, value: "⠀"},
                        { name: `Maximo: R$${DFranco.Max}`, value: "⠀" },
                        { name: `Minima: R$${DFranco.Min}`, value: "⠀" },
                    )
                    .setThumbnail("https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif")
                msg.channel.send(embedfr)
                break;
            case 'peso':
                const DPeso = await Peso();
                const embedp = new MessageEmbed()
                    .setTitle("Mostra a cotação da moeda em tempo real")
                    .addFields(
                        { name: `Moeda: ${DPeso.NomeM}`, value: "⠀" },
                        { name: `Compra: R$${DPeso.Compra}`, value: "⠀" },
                        { name: `Venda: R$${DPeso.Venda}`, value: "⠀" },
                        { name: `Variação: ${DPeso.Variacao}%`, value: "⠀" },
                        { name: `Porcentagem de variacao: ${DPeso.PorCento}%`, value: "⠀"},
                        { name: `Maximo: R$${DPeso.Max}`, value: "⠀" },
                        { name: `Minima: R$${DPeso.Min}`, value: "⠀" },
                    )
                    .setThumbnail("https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif")
                msg.channel.send(embedp)
                break;
            default:
                const embedn = new MessageEmbed()
                    .setTitle("Mostra a cotação da moeda em tempo real")
                    .setDescription("Por favor insira o nome da moeda, por exemplo:\n\n.moeda iene ou .moeda peso\n\nMoedas disponiveis para pesquisar: dolar, euro, turismo, canada, libra, bitcoin, litecoin, iene, franco e peso argentino")
                    .setThumbnail("https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif")
                msg.channel.send(embedn)

        }
        const resultado = await axios.get("https://economia.awesomeapi.com.br/json/all");
        const p = resultado.data.USD
        console.log(p)
    } catch (e) {
        console.log(e)
    }
}

const Dolar = async () => {
    try {
        const resultado = await axios.get("https://economia.awesomeapi.com.br/json/all");

        const { name: NomeM, bid: Compra, ask: Venda, varBid: Variacao, pctChange: PorCento, high: Max, low: Min } = resultado.data.USD;

        return {
            NomeM,
            Compra,
            Venda,
            Variacao,
            PorCento,
            Max,
            Min
        }
    } catch (e) {
        console.log(e)
    }
}

const Euro = async () => {
    try {
        const resultado = await axios.get("https://economia.awesomeapi.com.br/json/all");

        const { name: NomeM, bid: Compra, ask: Venda, varBid: Variacao, pctChange: PorCento, high: Max, low: Min } = resultado.data.EUR;

        return {
            NomeM,
            Compra,
            Venda,
            Variacao,
            PorCento,
            Max,
            Min
        }
    } catch (e) {
        console.log(e)
    }
}
const DolarTurismo = async () => {
    try {
        const resultado = await axios.get("https://economia.awesomeapi.com.br/json/all");

        const { name: NomeM, bid: Compra, ask: Venda, varBid: Variacao, pctChange: PorCento, high: Max, low: Min } = resultado.data.USDT;

        return {
            NomeM,
            Compra,
            Venda,
            Variacao,
            PorCento,
            Max,
            Min
        }
    } catch (e) {
        console.log(e)
    }
}
const DolarCad = async () => {
    try {
        const resultado = await axios.get("https://economia.awesomeapi.com.br/json/all");

        const { name: NomeM, bid: Compra, ask: Venda, varBid: Variacao, pctChange: PorCento, high: Max, low: Min } = resultado.data.CAD;

        return {
            NomeM,
            Compra,
            Venda,
            Variacao,
            PorCento,
            Max,
            Min
        }
    } catch (e) {
        console.log(e)
    }
}
const Libra = async () => {
    try {
        const resultado = await axios.get("https://economia.awesomeapi.com.br/json/all");

        const { name: NomeM, bid: Compra, ask: Venda, varBid: Variacao, pctChange: PorCento, high: Max, low: Min } = resultado.data.GBP;

        return {
            NomeM,
            Compra,
            Venda,
            Variacao,
            PorCento,
            Max,
            Min
        }
    } catch (e) {
        console.log(e)
    }
}
const Bitcoin = async () => {
    try {
        const resultado = await axios.get("https://economia.awesomeapi.com.br/json/all");

        const { name: NomeM, bid: Compra, ask: Venda, varBid: Variacao, pctChange: PorCento, high: Max, low: Min } = resultado.data.BTC;

        return {
            NomeM,
            Compra,
            Venda,
            Variacao,
            PorCento,
            Max,
            Min
        }
    } catch (e) {
        console.log(e)
    }
}
const LiteCoin = async () => {
    try {
        const resultado = await axios.get("https://economia.awesomeapi.com.br/json/all");

        const { name: NomeM, bid: Compra, ask: Venda, varBid: Variacao, pctChange: PorCento, high: Max, low: Min } = resultado.data.LTC;

        return {
            NomeM,
            Compra,
            Venda,
            Variacao,
            PorCento,
            Max,
            Min
        }
    } catch (e) {
        console.log(e)
    }
}
const Iene = async () => {
    try {
        const resultado = await axios.get("https://economia.awesomeapi.com.br/json/all");

        const { name: NomeM, bid: Compra, ask: Venda, varBid: Variacao, pctChange: PorCento, high: Max, low: Min } = resultado.data.JPY;

        return {
            NomeM,
            Compra,
            Venda,
            Variacao,
            PorCento,
            Max,
            Min
        }
    } catch (e) {
        console.log(e)
    }
}
const Franco = async () => {
    try {
        const resultado = await axios.get("https://economia.awesomeapi.com.br/json/all");

        const { name: NomeM, bid: Compra, ask: Venda, varBid: Variacao, pctChange: PorCento, high: Max, low: Min } = resultado.data.CHF;

        return {
            NomeM,
            Compra,
            Venda,
            Variacao,
            PorCento,
            Max,
            Min
        }
    } catch (e) {
        console.log(e)
    }
}
const Peso = async () => {
    try {
        const resultado = await axios.get("https://economia.awesomeapi.com.br/json/all");

        const { name: NomeM, bid: Compra, ask: Venda, varBid: Variacao, pctChange: PorCento, high: Max, low: Min } = resultado.data.ARS;

        return {
            NomeM,
            Compra,
            Venda,
            Variacao,
            PorCento,
            Max,
            Min
        }
    } catch (e) {
        console.log(e)
    }
}



module.exports = {
    name: "moeda",
    help: "Ve a cotacao das moedas",
    execute,
}
