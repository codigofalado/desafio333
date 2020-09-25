const { MessageEmbed } = require("discord.js");

const execute = (bot, msg, args) => {
    const link = 'https://discord.com/api/oauth2/authorize?client_id=714331640867979304&permissions=2138439127&scope=bot';
    const convida = new MessageEmbed()
        .setAuthor('Dmitri BOT')
        .setDescription('Convide o bot para o servidor usando esse link! :)')
        .setTitle("Só clicar aqui!")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=714331640867979304&permissions=2117598535&scope=bot")
    //msg.channel.send('https://discord.com/api/oauth2/authorize?client_id=714331640867979304&permissions=2138439127&scope=bot')
    return msg.channel.send(convida);
};

module.exports = {
    name: "convite",
    aliases: ["invite","convidar"],
    help: "Link para convidar o bot para o servidor, assim você me ajuda a divulgar :)",
    execute,
}