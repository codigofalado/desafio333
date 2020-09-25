const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
  let id = msg.author.id;
  let autor = msg.author;
  msg.delete().catch((O_o) => {});
  let description = [
    "** Fun Commands - 🥳 **",
    "** Helpfull Commands - 🔧 **",
    "** Comando de musica - 🎵 **",
    "** Comandos em BETA - 💸 **",
    "** **",
    "** Menu - ⬆️**",
  ];

  let diverts = [
    ".8ball | magic",
    ".magic pergunta",
    "-----------------------",
    ".gif - Mostra um gif aleatório do que você pesquisou",
    ".gif o texto",
    "-----------------------",
    ".hug | abraçar",
    ".hug @user",
    "-----------------------",
    ".info",
    ".info server | info @user",
    "-----------------------",
    ".triggered",
    ".triggered @user",
    "-----------------------",
    ".wasted",
    ".wasted @user",
    "-----------------------",
    ".youtube - fake comentário",
    ".youtube [texto]",
    "-----------------------",
    ".memes",
    "Mostra memes br",
    "-----------------------",
    ".memeNA | memena | memesna | memesNA",
    "Mostra memes americanos ",
    "-----------------------",
    ".gemidao",
    "Escreve o gemidão kk",
    
  ];

  let musicas = [
    ".p | tocar",
    "p musica",
    "-----------------------",
    ".playlist | toca uma playlist do youtube",
    "playlist [link]",
    "-----------------------",
    ".pause",
    "Pausa a musica",
    "-----------------------",
    ".skip",
    "Pula a musica",
    "-----------------------",
    ".resume",
    "Volta a tocar a musica",
    "-----------------------",
    ".stop | Stop",
    "Para a musica e limpa a fila",
    "-----------------------",
    ".queue | Queue songs",
    "Exibe a fila",
    "-----------------------",
    ".volume | vol",
    ".vol 0 a 10",
    "-----------------------",
    ".np ",
    "Mostra a musica que está tocando no momento",
    "-----------------------",
    ".lyrics | ",
    "Encontra a letra da musica que esta tocando no bot",
    "-----------------------",
    ".Slyric | spotifyLyric | LetraSpotify",
    "Encontra a letra da musica que esta tocando no seu spotify",
  ];

  let ajudas = [
    ".corona",
    "Mostra o Status do corona virus no Brasil",
    "-----------------------",
    ".weather | clima | tempo",
    ".tempo [cidade] [estado]",
    "-----------------------",
    ".role - atribui um cargo para um usuario",
    ".role @user @cargo",
    "-----------------------",
    ".clear | Clear 1-99",
    ".clear 15",
    "-----------------------",
    ".qrcode",
    ".qrcode [link]",
    "-----------------------",
    ".nick",
    ".nick @user nome",
    "-----------------------",
    ".moeda",
    ".moeda dolar | euro | turismo | canada | libra | bitcoin | litecoin | iene | franco | peso argentino",
    "-----------------------",
    ".binario",
    ".binario texto",
    "-----------------------",
    ".cep",
    ".cep 12345-678",
    
];

  let economy = [
    ".translate",
    ".translate [idioma] texto",
    ".translate de Hi my name is Bruno",
    "-----------------------",
    ".jogador",
    ".jogador nome",
    "-----------------------",
    ".insta",
    ".insta nome",
    "-----------------------",
    "Idiomas suportados para traduzir:",
    "af - afrikaans",
    "ar - árabe",
    "bs - bósnio",
    "ca - catalo",
    "da - dinamarquês",
    "de - alemão",
    "el - grego",
    "en - inglês",
    "eo - esperanto",
    "es - espanhol",
    "fa - pérsio",
    "fil - filipino",
    "fr - francês",
    "ga - irlândes",
    "he - hebráico",
    "hr - croata",
    "id - indonês",
    "is - islandês",
    "it - italiano",
    "iw - hebraico",
    "ja - japonês",
    "ko - koreano",
    "la - latim",
    "ne - nepalês",
    "nl - holândes",
    "pt - português-PT",
    "ru - russo",
    "sv - suéco",
    "tr - turco",
    "zh-cn - chinese (simplified)",
    "zh-tw - chinese (traditional)",
    "-----------------------",
    "Desenvolvido pelo Bruno Gomes-ΔŁŦ-#6519",,


   
  ];
  const embed = new MessageEmbed() //criar emebed
    .setColor(`RANDOM`)
    .setDescription(description)
    .setTitle("Lista de Comandos:");
  msg.channel.send(embed).then((msg) => {
    //enviando emebd e os objetos de pages //?(reactions await events?!) // ⏪  ⏩
    msg.react("🥳").then((r) => {
      //colocando reactions para andar nas pages
      msg.react("🔧");
      msg.react("🎵");
      msg.react("💸");
      msg.react("⬆️");

      //filtros
      const divertimentoF = (reaction, user) =>
        reaction.emoji.name === "🥳" && user.id === id;
      const settingsF = (reaction, user) =>
        reaction.emoji.name === "🔧" && user.id === id;
      const musicF = (reaction, user) =>
        reaction.emoji.name === "🎵" && user.id === id;
      const menuF = (reaction, user) =>
        reaction.emoji.name === "⬆️" && user.id === id;
      const economiaF = (reaction, user) =>
        reaction.emoji.name === "💸" && user.id === id;
      const divertimento = msg.createReactionCollector(divertimentoF, {
        time: 60000,
      });
      const settings = msg.createReactionCollector(settingsF, {
        time: 60000,
      });
      const music = msg.createReactionCollector(musicF, {
        time: 60000,
      });
      const menu = msg.createReactionCollector(menuF, {
        time: 60000,
      });
      const econmia = msg.createReactionCollector(economiaF, {
        time: 60000,
      });

      divertimento.on("collect", (r) => {
        //🥳
        async function remove() {
          const userReactions = msg.reactions.cache.filter((reaction) =>
            reaction.users.cache.has(id)
          );
          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }
        }
        if (embed.title === "Fun Commands - 🥳") {
          msg.channel
            .send(`${autor}, You are already in the fun`)
            .then((msg) => msg.delete({ timeout: 3500 }));
          remove();
          return;
        }
        embed.setTitle("Fun Commands - 🥳");
        embed.setDescription(diverts);
        msg.edit(embed);

        remove();
      });

      settings.on("collect", (r) => {
        async function remove() {
          const userReactions = msg.reactions.cache.filter((reaction) =>
            reaction.users.cache.has(id)
          );
          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }
        }
        if (embed.title === "Helpfull Commands - 🔧") {
          msg.channel
            .send(`${autor}, You are already in help`)
            .then((msg) => msg.delete({ timeout: 3500 }));
          remove();
          return;
        }
        embed.setTitle("Helpfull Commands - 🔧");
        embed.setDescription(ajudas);
        msg.edit(embed);

        remove();
      });

      music.on("collect", (r) => {
        async function remove() {
          const userReactions = msg.reactions.cache.filter((reaction) =>
            reaction.users.cache.has(id)
          );
          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }
        }
        if (embed.title === "Comando de musica - 🎵") {
          msg.channel
            .send(`${autor}, You are already in music`)
            .then((msg) => msg.delete({ timeout: 3500 }));
          remove();
          return;
        }
        embed.setTitle("Comando de musica - 🎵");
        embed.setDescription(musicas);
        msg.edit(embed);

        remove();
      });

      menu.on("collect", (r) => {
        async function remove() {
          const userReactions = msg.reactions.cache.filter((reaction) =>
            reaction.users.cache.has(id)
          );
          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }
        }
        if (embed.title === "Lista de Comandos:") {
          msg.channel
            .send(`${autor}, You are already in menu`)
            .then((msg) => msg.delete({ timeout: 3500 }));
          remove();
          return;
        }

        embed.setColor(`RANDOM`);
        embed.setDescription(description);
        embed.setTitle("Lista de Comandos:");

        remove();
        msg.edit(embed);
      });

      econmia.on("collect", (r) => {
        async function remove() {
          const userReactions = msg.reactions.cache.filter((reaction) =>
            reaction.users.cache.has(id)
          );
          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }
        }
        if (embed.title === "Comandos em BETA") {
          msg.channel
            .send(`${autor}, You are already in menu`)
            .then((msg) => msg.delete({ timeout: 3500 }));
          remove();
          return;
        }

        embed.setColor(`RANDOM`);
        embed.setDescription(economy);
        embed.setTitle("Comandos em BETA");

        remove();
        msg.edit(embed);
      });
    });
  });
};

module.exports = {
  name: "help",
  help: "Embed edit page test",
  execute,
};