const MessageEmbed = require("discord.js").MessageEmbed;


async function execute(bot, msg, args) {
    const s = args.join(" ");

    const validar = isValidURL(s)
    if (validar == true) {
        const linkB = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data"
        const linkNovo = `${linkB}=${encodeURI(s)}`
        const embed = new MessageEmbed()
            .setAuthor("QR-CODE do link meu consagrado",
            "https://media.giphy.com/media/XbZ1FZ4xtzDKE/giphy.gif")
            .setImage(linkNovo)
        msg.channel.send(embed);
    } else {
        msg.reply("Ta de brinqueixon with me cara? Manda um link pessoinha")
    }
}
function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};


module.exports = {
    name: "qrcode",
    help: "Mande um link e ele gera um QR-CODE para você clicar :)",
    execute,
}