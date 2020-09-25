const Discord = require("discord.js");
const axios = require("axios");
const { Translate } = require("@google-cloud/translate/build/src/v2");
const { lang } = require("moment");
const MessageEmbed = require("discord.js").MessageEmbed;



async function execute(bot, msg, args) {
    try {
        const language = args[0];
        const text = args.slice(1).join(' ');
        let primeiro = await detectar(language)
        console.log(primeiro)
        const texto = await traduzir(language, text)
        const traducao = await traduzido(language, text)
        console.log(texto)
        const embed = new MessageEmbed()
        .setTitle(`Texto traduzido do (${primeiro}) para (${traducao})\n\n`)
        .setThumbnail("https://media.giphy.com/media/xT77XZrTKOxycjaYvK/giphy.gif")
        .setDescription(`Texto original: ${text}\n\nTexto traduzido: ${texto}\n\n`)
        .setFooter("Desenvolvido pelo Bruno Gomes-ΔŁŦ-#6519 [comando em BETA]")
        msg.channel.send(embed)
    } catch (e) {
        console.error(e)
    }


}
async function traduzir(language, b) {
    try {
       

        const response = await axios({
            "method": "POST",
            "url": "https://simple-elegant-translation-service.p.rapidapi.com/translate",
            "headers": {
                "content-type": "application/json",
                "x-rapidapi-host": "simple-elegant-translation-service.p.rapidapi.com",
                "x-rapidapi-key": "3da1d5bb6dmsh1efbd62e8c685aep18e4f0jsn3b27a822a344",
                "accept": "application/json",
                "useQueryString": true
            }, "data": {
                "text": `${b}`,
                "dest": `${language}`,
            }
        });
        const ta = response.data["translated"]["3.translated text"]
        console.log(ta)
        return ta;

    } catch (e) {
        console.log(e)
    }
}
async function traduzido(language, b) {
    try {
      
        const response = await axios({
            "method": "POST",
            "url": "https://simple-elegant-translation-service.p.rapidapi.com/translate",
            "headers": {
                "content-type": "application/json",
                "x-rapidapi-host": "simple-elegant-translation-service.p.rapidapi.com",
                "x-rapidapi-key": "3da1d5bb6dmsh1efbd62e8c685aep18e4f0jsn3b27a822a344",
                "accept": "application/json",
                "useQueryString": true
            }, "data": {
                "text": `${b}`,
                "dest": `${language}`,
            }
        });
        const ta = response.data["translated"]["2.destination language"]
        console.log(ta)
        return ta;

    } catch (e) {
        console.log(e)
    }
}
function idiomas() {
    axios({
        "method": "GET",
        "url": "https://simple-elegant-translation-service.p.rapidapi.com/getSupportedLanguages",
        "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "simple-elegant-translation-service.p.rapidapi.com",
            "x-rapidapi-key": "3da1d5bb6dmsh1efbd62e8c685aep18e4f0jsn3b27a822a344",
            "useQueryString": true
        }
    })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}

async function detectar(s) {
    try {
        
        const response = await axios({
            "method": "POST",
            "url": "https://simple-elegant-translation-service.p.rapidapi.com/detectLanguage",
            "headers": {
                "content-type": "application/json",
                "x-rapidapi-host": "simple-elegant-translation-service.p.rapidapi.com",
                "x-rapidapi-key": "3da1d5bb6dmsh1efbd62e8c685aep18e4f0jsn3b27a822a344",
                "accept": "application/json",
                "useQueryString": true
            }, "data": {
                "text": `${s}`
            }
        });
        const idioma = response.data["detect language"]["1.language"]
        console.log(idioma)
        return idioma
    } catch (e) {
        console.log(e)
    }

}

module.exports = {
    name: "translate",
    help: "Traduz para o idioma que quer",
    execute,
}