const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if (!queue) {
        return msg.reply("Não existe nenhuma musica na fila seu animal");
    }
    queue.dispatcher.pause();
};

module.exports = {
    name: "pause",
    help: "Pausa a reprodução de música atual",
    execute,
};