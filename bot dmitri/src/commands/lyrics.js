const { KSoftClient } = require('@ksoft/api');
const MessageEmbed = require("discord.js").MessageEmbed;
const { Utils } = require("erela.js");
const { RichEmbed } = require("discord.js");
const ksoft = new KSoftClient(process.env.KSOFT);
const cheerio = require('cheerio');
const fetch = require("node-fetch");


async function execute(bot, msg, args) {
    const queue = bot.queues.get(msg.guild.id)

    try {

        if (!queue) {
            return msg.reply("Sem musicas na lifa");
        }
        const np = queue.songs[0].title;
        console.log(`${np}`);

        const sentmsg = await msg.channel.send(
            '👀 Tentando encontrar a letra 👀'
        );
        const headers = {
            Authorization: `Bearer ${process.env.KSOFT}`
        };
        var url = `https://api.ksoft.si/lyrics/search?q=${encodeURIComponent(np)}&limit=1`;
        console.log(url)
        const res = await fetch(url, { headers });
        const song = await res.json();
        const lyrics = song.data[0].lyrics;
        const name = song.data[0].name;
        const albumArt = song.data[0].album_art;
        const artist = song.data[0].artist;
        if (!lyrics) {
            return sentmsg.edit("Não foi encontrado nenhuma letra para essa musica");

        }
        if (lyrics.length >= 5800) {
            return sentmsg.edit("A letra é muito grande para ser enviada no discord")
        }
        const nL = lyrics.length % 2048;

        if (lyrics.length < 2048) {
            const lyricsEmbed = new MessageEmbed()
                .setAuthor(`${artist} - ${name}`)
                .setColor('#EBAE34')
                .setThumbnail(albumArt)
                .setDescription(lyrics)
                .setFooter('Powered by KSoft.Si');
            return sentmsg.edit('', lyricsEmbed);
        } else {
            // const firstLyricsEmbed = new MessageEmbed()
            //     .setAuthor(`${artist} - ${name}`)
            //     .setColor('#EBAE34')
            //     .setThumbnail(albumArt)
            //     .setDescription(lyrics.slice(0, 2048));
            // const secondLyricsEmbed = new MessageEmbed()
            //     .setColor('#EBAE34')
            //     .setDescription(lyrics.slice(2048, lyrics.length))
            //     .setFooter('Powered by KSoft.Si');
            // sentmsg.edit('', firstLyricsEmbed);
            // msg.channel.send(secondLyricsEmbed);
            // return;
            const partsToSlice = parseInt(lyrics.length / 1024);
            const valor = lyrics.length / 1024;
            console.log(valor)
            console.log(partsToSlice)
            const part1 = lyrics.slice(0, 1024);
            const part2 = lyrics.slice(1024, 2048);
            const part3 = lyrics.slice(2049, 3072);
            const part4 = lyrics.slice(3073, 4096);
            const part5 = lyrics.slice(4097, 5121);
            const part6 = lyrics.slice(5122, 5800);
            if ((lyrics.length < 2049)) {
                const firstLyricsEmbed = new MessageEmbed()
                    .setAuthor(`${artist} - ${name}`)
                    .setColor('#EBAE34')
                    .setThumbnail(albumArt)
                    .setFooter('Powered by KSoft.Si')
                    .addFields(
                        { name: '⠀', value: part1 },
                        { name: '⠀', value: part2 },
                    );
                sentmsg.edit('', firstLyricsEmbed);
            }

            if ((lyrics.length < 3073)) {
                const firstLyricsEmbed = new MessageEmbed()
                    .setAuthor(`${artist} - ${name}`)
                    .setColor('#EBAE34')
                    .setThumbnail(albumArt)
                    .setFooter('Powered by KSoft.Si')
                    .addFields(
                        { name: '⠀', value: part1 },
                        { name: '⠀', value: part2 },
                        { name: '⠀', value: part3 },
                    );
                sentmsg.edit('', firstLyricsEmbed);
            }

            if ((lyrics.length < 4097)) {
                const firstLyricsEmbed = new MessageEmbed()
                    .setAuthor(`${artist} - ${name}`)
                    .setColor('#EBAE34')
                    .setThumbnail(albumArt)
                    .setFooter('Powered by KSoft.Si')
                    .addFields(
                        { name: '⠀', value: part1 },
                        { name: '⠀', value: part2 },
                        { name: '⠀', value: part3 },
                        { name: '⠀', value: part4 },
                    );
                sentmsg.edit('', firstLyricsEmbed);
            }

            if ((lyrics.length < 5122)) {
                const firstLyricsEmbed = new MessageEmbed()
                    .setAuthor(`${artist} - ${name}`)
                    .setColor('#EBAE34')
                    .setThumbnail(albumArt)
                    .setFooter('Powered by KSoft.Si')
                    .addFields(
                        { name: '⠀', value: part1 },
                        { name: '⠀', value: part2 },
                        { name: '⠀', value: part3 },
                        { name: '⠀', value: part4 },
                        { name: '⠀', value: part5 },
                    );
                sentmsg.edit('', firstLyricsEmbed);
            }

            if (partsToSlice == 6) {
                const firstLyricsEmbed = new MessageEmbed()
                    .setAuthor(`${artist} - ${name}`)
                    .setColor('#EBAE34')
                    .setThumbnail(albumArt)
                    .setFooter('Powered by KSoft.Si')
                    .addFields(
                        { name: '⠀', value: part1 },
                        { name: '⠀', value: part2 },
                        { name: '⠀', value: part3 },
                        { name: '⠀', value: part4 },
                        { name: '⠀', value: part5 },
                        { name: '⠀', value: part6 },
                    );
                sentmsg.edit('', firstLyricsEmbed);
            }

        }
    } catch (e) {
        console.error(e)
    }
};


module.exports = {
    name: "lyrics",
    aliases: ["lyric"],
    help: "Mostra a letra da musica! .lyric também funciona",
    execute,
}