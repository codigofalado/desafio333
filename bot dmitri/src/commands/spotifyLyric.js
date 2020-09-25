const { KSoftClient } = require('@ksoft/api');
const MessageEmbed = require("discord.js").MessageEmbed;
const { Utils } = require("erela.js");
const { RichEmbed } = require("discord.js");
const ksoft = new KSoftClient(process.env.KSOFT);
const fetch = require("node-fetch");

async function execute(bot, msg, args) {

    let user = msg.member.presence.activities;
    const np = getSpotify(user);
    try {
        const sentmsg = await msg.channel.send(
            '👀 Tentando encontrar a letra 👀'
        );
        const headers = {
            Authorization: `Bearer ${process.env.KSOFT}`
        };
        var url = `https://api.ksoft.si/lyrics/search?q=${encodeURIComponent(np)}&limit=1`;
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
            
            const partsToSlice = parseInt(lyrics.length / 1024);
            const valor = lyrics.length / 1024;

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

function getSpotify(user) {
    for (const presence of user) {
        if (presence.name === 'Spotify' && presence.applicationID === null) {
            // Spotify - Presence#state = Artists, seperated by `;`
            // Spotify - Presence#details = Song Title

            const songArtist = presence.state || ''
            const songPrimaryArtist = songArtist.split(';')[0] || songArtist // Only takes the first artist

            const songTitle = presence.details || ''
            const songTitleCleanBrackets = songTitle.split('(')[0] // Cleans anything brackets
            const songTitleCleanDash = songTitleCleanBrackets.split('-')[0] // Cleans anything brackets

            const cleanSongTitle = songTitleCleanDash
            const p = (`${cleanSongTitle} - ${songPrimaryArtist}`);

            return p;

        } else {
            console.log("Não encontrei a musica do spotify");
        }
    }
}

module.exports = {
    name: "sLyric",
    aliases: ["spotifyLyric","LetraSpotify"],
    help: "Mostra a letra da musica que está tocando no seu spotify",
    execute,
};
