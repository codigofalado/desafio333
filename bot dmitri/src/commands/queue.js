const { Utils } = require("erela.js")
const { RichEmbed } = require("discord.js")
const MessageEmbed = require("discord.js").MessageEmbed;

async function execute(bot, msg, args) {
    const queue = bot.queues.get(msg.guild.id);

    if (!queue) {
        return msg.reply("Não existe nenhuma musica na fila seu animal");
    } else {

        let currentPage = 0;
        const embeds = generateQueue(queue.songs)
        const queueEmbed = await msg.channel.send(`Pagina atual: ${currentPage + 1}/${embeds.length}`, embeds[currentPage]);
        await queueEmbed.react('⬅️');
        await queueEmbed.react('➡️');
        await queueEmbed.react('❌');

        const filter = (reaction, user) => ['⬅️', '➡️', '❌'].includes(reaction.emoji.name) && (msg.author.id === user.id);
        const collector = queueEmbed.createReactionCollector(filter)

        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === '➡️') {
                if (currentPage < embeds.length - 1) {
                    currentPage++;
                    queueEmbed.edit(`Pagina atual: ${currentPage + 1}/${embeds.length}`, embeds[currentPage]);
                }
            } else if (reaction.emoji.name === '⬅️') {
                if (currentPage !== 0) {
                    --currentPage;
                    queueEmbed.edit(`Pagina atual ${currentPage + 1}/${embeds.length}`, embeds[currentPage]);
                }
            } else {
                collector.stop();
                console.log('Parou de coletar')
                await queueEmbed.delete();
            }
        });
    }
};

function generateQueue(queue) {
    const embeds = [];

    let k = 10;
    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k);
        let j = i;
        k += 10;
        const info = current.map(queue => `${++j}) [${queue.title}](${queue.url})`).join('\n');
        const embed = new MessageEmbed()
            .setAuthor("Tocando agora: ",
                "https://media.giphy.com/media/ccu9c0Iu7aGFa/giphy.gif")
            .setDescription(`**${queue[0].title}]**\n\n${info}`)
        embeds.push(embed);
    }
    return embeds;
}

module.exports = {
    name: "queue",
    help: "Mostra a fila de músicas",
    execute,
};