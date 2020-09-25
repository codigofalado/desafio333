const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if (!queue) {
        return msg.reply("Não existe nenhuma musica na fila seu animal");
    }
    const volume = Number(args.join(" "));
    if(isNaN(volume) || volume < 0 || volume > 10) {
        return msg.reply(" o volume deve ser um valor entre 0 e 10");
    }
    queue.dispatcher.setVolume(volume/10);
    queue.volume = volume;
    bot.queues.set(msg.guild.id, queue);

    msg.reply(`o volume foi para: ${volume}`);
};

module.exports = {
    name: "vol",
    aliases: ["volume"],
    help: "Ajusta o volume numa escala de 0 a 10",
    execute,
};