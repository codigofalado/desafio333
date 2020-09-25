const Discord = require("discord.js");

const execute = (bot,msg,args) =>{
    var responses = [
        'Mas é claro!',
        'Me deixou um pouco intrigado',
        'Sem duvidas!',
        'Sim!!! haha',
        'Você deve tomar essa decisão amigo',
        'Como disse, sim!',
        'Mais ou menos',
        'Me parece bom',
        'Sim',
        'Tudo aponta pra sim',
        'É amigo, não foi dessa vez né?!',
        'Me pergunta depois, to vendo quanto ta o dólar',
        'Melhor não dizer agora',
        'Não consigo prever isso',
        'Use a força e me pergunte depois',
        'Não me conte com isso',
        'Minha resposta é não',
        'Meu recursos dizem que é melhor não',
        'O não é a melhor resposta',
        'HAHA que burro! dá zero pra ele.'
    ];
    const valor = getRandomInt(1,responses.length)
    console.log(responses.length)
    console.log(valor)
    var response = responses[valor];
    msg.reply(response)
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    name: "magic",
    aliases: ["8ball"],
    help: "Escreva uma pergunta, usando o ;magic [pergunta] e veja a resposta",
    execute,
}