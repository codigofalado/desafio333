const ytpl = require("ytpl")
const Discord = require("discord.js")
const ytdl = require("ytdl-core-discord");
const search = require("yt-search");
const MessageEmbed = require("discord.js").MessageEmbed;

const playSong = require("./play").playSong;

async function execute(bot, msg, args) {
    const s = args.join(" ");
    if (!msg.member.voice.channel) {
                            
                            
        return msg.reply("Você precisa estar em um canal para reproduzir");
    }
    try {
        let playlist = null;
        playlist = await ytpl(s);
        let videos = playlist.items
        console.log(playlist.total_items)
        // console.log(videos[0])
        let music = videos[0].title
        console.log(music)

        var i = 0;
        while (i <= playlist.total_items) {
            PlayL = await ytpl(s);
            let nome = PlayL.items[i].title;
            console.nome;
            let videoEntry = videos[i].title;
            search(videoEntry, async (err, result) => {
                // console.log(result.videos[0])
                // console.log(videoEntry)
                if (err) {
                    throw err;
                } else if (result && result.videos.length > 0) {
                    const song = result.videos[0];
                    let queue = bot.queues.get(msg.guild.id);
                    if (queue) {

                        queue.songs.push(song);
                        bot.queues.set(msg.guild.id, queue);

                    } if(!queue) {

                        
                        const conn = await msg.member.voice.channel.join();
                        queue = {
                            volume: 10,
                            connection: conn,
                            dispatcher: null,
                            songs: [song],
                        };
                        bot.queues.set(msg.member.guild.id, queue);


                        // const r = new MessageEmbed()
                        //     .setColor("#0099ff")
                        //     .setAuthor(
                        //         "Tocando ♪ ...",
                        //         "https://media.giphy.com/media/ccu9c0Iu7aGFa/giphy.gif"
                        //     )
                        //     .setTitle(`${song.title}`)
                        //     .setURL(song.url)
                        //     .setThumbnail(song.thumbnail)
                        // msg.channel.send(r);


                        queue.dispatcher = await queue.connection.play(
                            await ytdl(song.url, { highWaterMark: 1 << 25, filter: "audioonly" }),
                            {
                                type: "opus",
                            }
                        );

                        // queue.dispatcher.on("finish", () => {
                        //     queue.songs.shift();
                        //     playSong(bot, msg, queue.songs[0]);

                        // });
                        playSong(bot, msg, song)
                        console.log(queue.songs.length)
                    }
                    console.log(queue.songs.length)
                } else if (result.title == "[Private video]" || null) {


                    msg.channel.send("Uma musica não consegui reproduzir")
                }


            })
            i++;

        }
        msg.channel.send("Musicas adicionadas!")


    } catch (e) {
        console.error(e)
    }

}

module.exports = {
    name: "playlist",
    aliases: ["pl"],
    help: "Toca a playlist, só colocar o link [ESTÁ EM BETA]",
    execute,
};