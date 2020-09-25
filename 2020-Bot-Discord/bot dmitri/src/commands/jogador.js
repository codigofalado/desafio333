const axios = require("axios");
const MessageEmbed = require("discord.js").MessageEmbed;

async function execute(bot, msg, args) {
    try {
        const name = args.join(" ");
        const dadosAPI = await buscar(name);
        const embed = new MessageEmbed()
        .setTitle("Mostra os dados do jogador\n\n")

        .addFields(
            {name: `Nome: ${dadosAPI.Nome}`, value:"⠀"},
            {name: `Numero camisa do Jogador: ${dadosAPI.Num}`, value:"⠀"},
            {name: `País: ${dadosAPI.pais}`, value: "⠀"},
            {name: `Idade: ${dadosAPI.idade} anos`, value: "⠀"},
            {name: `Gols na temporada: ${dadosAPI.gols}`, value: "⠀"},
            {name: `Cartões Amarelos: ${dadosAPI.amarelo}`, value: "⠀"},
            {name: `Cartões Vermelhos: ${dadosAPI.vermelho}`, value: "⠀"},
            {name: `Time: ${dadosAPI.time}`, value: "⠀"},
            
        )
        .setThumbnail("https://media.giphy.com/media/NWlBEcDW5evFS/giphy.gif")
        .setFooter("API em BETA")
        msg.channel.send(embed)

    } catch (e) {
        console.log(e)
        msg.channel.send("Desculpe não achei o jogador, tente colocar o sobrenome na frente e depois o primeiro nome")
       
    }
}
const buscar = async (name) => {
    try {
        const url = `https://allsportsapi.com/api/football/?met=Players&APIkey=${process.env.PLAYER}&playerName=${name}`
        const player = await axios.get(url)
        const [{ player_name: Nome, player_number: Num, player_country: pais, player_age: idade, player_goals: gols, player_yellow_cards: amarelo, player_red_cards: vermelho, team_name: time }] = player.data["result"]
        console.log(Nome, Num, pais, idade, gols, amarelo, vermelho, time)


        console.log(player.data)
        return {
            Nome,
            Num,
            pais,
            idade,
            gols,
            amarelo,
            vermelho,
            time
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    name: "jogador",
    aliases: ["player"],
    help: "Da as informações do jogador",
    execute,
}