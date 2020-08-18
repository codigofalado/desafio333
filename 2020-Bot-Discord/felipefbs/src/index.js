const Discord = require("discord.js");
const ytdl = require("ytdl-core");

require("dotenv").config();

const { phrases } = require("../utils/phrases");
let { lofiList, musicList } = require("../utils/urls");

const client = new Discord.Client();

// Token to login the bot on discord
const TOKEN = process.env.TOKEN;
client.login(TOKEN);

// Word that invokes the bot
const prefix = "tim";

const queue = new Map();

client.on("message", async (message) => {
  // Bot will igonre it self messages and messages that not begin with prefix
  if (message.author.bot || !message.content.search(/`${prefix}`/i)) return;

  const serverQueue = queue.get(message.guild.id);

  command = message.content.split(" ");
  command = command.filter((word) => {
    if (word) return word;
  });

  if (command[1].toLowerCase() === `filosofa`) {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    message.channel.send(phrase);
  }

  if (command[1].toLowerCase() === "toca") {
    const voiceChannel = message.member.voice.channel;
    const textChannel = message.channel;

    if (checkChannel(message, voiceChannel)) return;
    if (!command[2] || command[2] !== "lofi") {
      song = await musicSelector(false);

      message.channel.send(
        `Vou tocar essa daqui\n -> ${song.title}\n${song.video_url}`
      );
      musicHandler(message, serverQueue, voiceChannel, textChannel, song);

      return;
    }
    if (command[2].toLowerCase() === "lofi") {
      song = await musicSelector(true);

      message.channel.send(
        `Vou tocar esse lofi do bom aqui\n -> ${song.title}\n${song.video_url}`
      );
      musicHandler(message, serverQueue, voiceChannel, textChannel, song);

      return;
    }
  }

  if (message.content.startsWith(`${prefix} passa essa`)) {
    skip(message, serverQueue);
    return;
  }

  if (message.content.startsWith(`${prefix} olha o breque`)) {
    stop(message, serverQueue);
    return;
  }
});

async function musicSelector(isLofi) {
  if (isLofi) musicList = lofiList;

  const musicURL = musicList[Math.floor(Math.random() * musicList.length)];

  const songInfo = await ytdl.getInfo(musicURL);

  const song = {
    title: songInfo.videoDetails.title,
    video_url: songInfo.videoDetails.video_url,
  };

  return song;
}

function checkChannel(message, voiceChannel) {
  if (!voiceChannel)
    return message.channel.send(
      "**Entra ai num canal de voz que eu canto pra tu!**"
    );

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "Mermão, **preciso de permissão para entrar e cantar nesse canal de voz ai!**"
    );
  }
}

async function musicHandler(
  message,
  serverQueue,
  voiceChannel,
  textChannel,
  song
) {
  if (!serverQueue) {
    const queueContract = {
      textChannel: textChannel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };

    queue.set(message.guild.id, queueContract);

    queueContract.songs.push(song);

    try {
      let connection = await voiceChannel.join();
      queueContract.connection = connection;
      play(message.guild, queueContract.songs[0]);
    } catch (err) {
      console.error(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`Já já eu canto essa dai\n->${song.title}`);
  }
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.video_url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing **${song.title}**`);
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel) {
    return message.channel.send(
      "Tu precisa ta no canal de voz pra me dizer alguma coisa!"
    );
  }
  if (!serverQueue) {
    return message.channel.send("Mermão, tem música nenhuma pra passar não.");
  }
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel) {
    return message.channel.send(
      "Tu precisa ta no canal de voz pra me dizer alguma coisa!"
    );
  }
  if (serverQueue.songs) {
    serverQueue.songs = [];
  }
  serverQueue.connection.dispatcher.end();
}
