const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const axios = require("axios");

require("dotenv").config();

const { phrases } = require("../utils/phrases");
let { lofiList, musicList } = require("../utils/urls");

const client = new Discord.Client();

// Token to login the bot on discord
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
client.login(DISCORD_BOT_TOKEN);

const MAPQUEST_KEY = process.env.MAPQUEST_KEY;
const mapQuestURL = `http://www.mapquestapi.com/directions/v2/route?key=${MAPQUEST_KEY}`;
const musicDuration = 212;

// Word that invokes the bot
const prefix = "tim";
let counter = 0;

const queue = new Map();

client.on("message", async (message) => {
  // Bot will ignore it self messages and messages that not begin with prefix
  if (message.author.bot || !message.content.search(/`${prefix}`/i)) return;

  const serverQueue = queue.get(message.guild.id);

  command = message.content.split(" ");
  command = command.filter((word) => {
    if (word) return word;
  });
  if (!command[1]) {
    counter++;
    if (counter === 1) {
      message.channel.send(
        `Amigão, fala mais alto que não escutei direito. Se tiver muito difícil digita \`${prefix} me ajuda\``
      );
      return;
    } else if (counter === 2) {
      message.channel.send(
        `hahahaha esse dai parece que não sabe digitar os comandos direito. Digita ai \`${prefix} me ajuda\``
      );
      return;
    } else if (counter === 2) {
      message.channel.send("Ai meu Deus do céu");
      return;
    } else if (counter === 3) {
      message.channel.send("Mermão, faz as coisas direito");
      return;
    } else if (counter === 4) {
      message.channel.send(
        "Meu nome deve ter gosto bom pra tu ficar digitando ele né?"
      );
      return;
    } else if (counter === 5) {
      message.channel.send(
        "De novo isso? Vou sentar um pouquinho ali que já to ficando cansado"
      );
      counter = 0;
      return;
    }
    return;
  }
  if (message.content.startsWith(`${prefix} me ajuda`)) {
    message.channel.send(
      `My friend, aqui é tudo simples. \n
Só digitar \`${prefix} toca uma musica pra mim\` que eu toco uma musica pra mim.
Se tu digitar \`${prefix} toca lofi\` que eu pego um lofi gostosinho pra tu escutar.
Se tu não quer escutar a musica que ta tocando agora é só digitar \`${prefix} passa essa musica\`.
E se tu achar que eu tô incomodando demais é só digitar \`${prefix} olha o breque\` que eu saio na hora.

Eu também sou um grande filosofo ~~sem piadinhas sobre peso~~ . Se quiser só digitar \`${prefix} filosofa\` que solto uma frase que vai impactar você.

Agora, se você quer uma informação que vai ser muito util para sua vida é só digitar \`${prefix} calcula de \"Montadas, PB\" para \"Rio de Janeiro, RJ\"\`. Você pode substituir o que tá em parenteses por qualquer cidade e estado brasileiro e talvez do mundo e eu digo quantas vezes você pode escutar a música \"Do Leme ao Pontal\" durante a viagem. 
      `
    );
  }
  if (command[1].toLowerCase() === "filosofa") {
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

  if (command[1].toLowerCase() === "passa") {
    skip(message, serverQueue);
    return;
  }

  if (message.content.startsWith(`${prefix} olha o breque`)) {
    stop(message, serverQueue);
    return;
  }

  if (command[1].toLowerCase() === "calcula") {
    path = command.slice(2);

    if (checkPath(path)) {
      const { origin, destination } = pathExtractor(path);

      try {
        const {
          data: {
            route: { time, locations },
          },
        } = await axios.get(`${mapQuestURL}&from=${origin}&to=${destination}`);

        message.channel.send(
          `Olha, de ${locations[0].adminArea5} até ${
            locations[1].adminArea5
          } da pra escutar no mínimo ${Math.round(
            time / musicDuration
          )} vezes do Leme ao Pontal. Boa viagem, meu bem!`
        );
      } catch (e) {
        message.channel.send(
          "Esses caras to técnico são F#!D$, só fazem besteira. Me diz de novo direitinho o que tu quer."
        );
        console.error(e);
      }
    } else {
      message.channel.send("Diz esse caminho ai direitinho, meu");
    }
  }
});

function pathExtractor(path) {
  let origin = "";
  let destination = "";
  for (i = 1; i < path.findIndex((word) => word === "para"); i++) {
    if (path[i]) {
      origin += path[i];
    }
  }

  for (
    i = path.findIndex((word) => word === "para") + 1;
    i < path.length;
    i++
  ) {
    if (path[i]) {
      destination += path[i];
    }
  }

  return { origin, destination };
}

function checkPath(path) {
  return path[0] === "de" && path.find((word) => word === "para");
}

async function musicSelector(isLofi) {
  let list = isLofi ? lofiList : musicList;

  const musicURL = list[Math.floor(Math.random() * list.length)];

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
