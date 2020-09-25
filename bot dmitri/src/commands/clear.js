const execute = (bot, msg, args) => {
    if (msg.deletable) {
        msg.delete();
    }

    if(isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return msg.reply("Oloko! Tu não colocou nenhum número pra apagar");
    }

    let deleteAmout;

    if(parseInt(args[0]) > 100) {
        deleteAmout = 100;
    } else {
        deleteAmout = parseInt(args[0]);
    }

    msg.channel.bulkDelete(deleteAmout, true)
    .then(deleted => msg.channel.send(`Eu deletei \`${deleted.size}\` mensagens.`))
    .catch(err => msg.reply(`Deu erro ai meu bom 🙉🙉🦖🦖  ${err}`));

}

module.exports = {
    name: "clear",
    help: "Limpa o chat do canal com um numero",
    execute,
};