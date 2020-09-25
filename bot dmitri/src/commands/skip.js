const playSong = require("./play").playSong;

const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if (!queue) {
        return msg.reply("Não existe nenhuma musica na fila seu animal");
    }
    queue.songs.shift();
    bot.queues.set(msg.guild.id, queue);
    playSong(bot, msg, queue.songs[0]);
};

module.exports = {
    name: "skip",
    help: "Pula a musica para a próxima",
    execute,
};