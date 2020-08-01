/*                                                                               
  _____  ____    _    _  ____  _____   _____ ______ 
 / ____|/ __ \  | |  | |/ __ \|  __ \ / ____|  ____|
| |  __| |  | | | |__| | |  | | |__) | (___ | |__   
| | |_ | |  | | |  __  | |  | |  _  / \___ \|  __|  
| |__| | |__| | | |  | | |__| | | \ \ ____) | |____ 
 \_____|\____/  |_|  |_|\____/|_|  \_\_____/|______|      
 _____  _____   ____   _____ ______  _____ _____ 
|  __ \|  __ \ / __ \ / ____|  ____|/ ____/ ____|
| |__) | |__) | |  | | |    | |__  | (___| (___  
|  ___/|  _  /| |  | | |    |  __|  \___ \\___ \ 
| |    | | \ \| |__| | |____| |____ ____) |___) |
|_|    |_|  \_\\____/ \_____|______|_____/_____/ 
*/

require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('!!ajuda', { type: 'PLAYING' });
  let activity = ['LISTENING', 'PLAYING', 'STREAMING', 'WATCHING'];

  setInterval(() => {
    client.user.setActivity('!!ajuda', {
      type: activity[Math.floor(Math.random() * 4)],
    });
  }, 300000);
});

const reactionButtons = [
  '1️⃣',
  '2️⃣',
  '3️⃣',
  '4️⃣',
  '5️⃣',
  '6️⃣',
  '7️⃣',
  '8️⃣',
  '9️⃣',
  '❌',
];
const winSequences = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class TicTacToe {
  constructor({ author, mentions }, board, challenge) {
    this.gameBoard = board;
    this.player1 = author.id;
    if (mentions.users.first() && challenge) {
      this.player2 = mentions.users.first().bot
        ? client.user.id
        : mentions.users.first().id;
    } else {
      this.player2 = client.user.id;
    }
    this.status = 'Criando jogo';
    this.currentSymbol = 'X';
    this.currentPlayer = this.player1;
    this.board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
    this.waitingChallenge = this.player2 == client.user.id ? false : challenge;
    this.challengeMessage = '';
    this.timeout;

    playing.push(this.player1);
    if (this.player2 != client.user.id) {
      playing.push(this.player2);
    }

    if (this.waitingChallenge && this.player2 != client.user.id) {
      this.handleChallenge();
    } else {
      this.drawBoard();
      this.addReactions();
    }
  }

  handleTimeout(remove) {
    clearTimeout(this.timeout);
    if (remove) return;

    this.timeout = setTimeout(() => {
      this.status = 'Finalizado';
      this.drawBoard(`⏰ Sem ganhador! Não houve jogadas dentro de 5 minutos.`);
      this.currentPlayer = '';
      this.currentSymbol = '';
      this.gameBoard.reactions.removeAll();
      this.removePlayersPlaying();
      delete games[this.gameBoard.id];
    }, 300000);
  }

  handleChallenge() {
    this.status = 'Aguardando';
    this.drawBoard(
      `<@${this.player2}> você tem 1 minuto para aceitar ou recusar o desafio de <@${this.player1}>`
    );
    this.gameBoard.react('✅');
    this.gameBoard.react('❌');

    this.gameBoard
      .awaitReactions(
        (reaction, user) => {
          if (user.id == client.user.id) return;

          if ('❌' == reaction.emoji.name && user.id == this.player1) {
            this.challengeMessage = `❌ <@${this.player1}> cancelou o desafio.`;
            this.status = 'Cancelado';
            return true;
          } else if ('❌' == reaction.emoji.name && user.id == this.player2) {
            this.challengeMessage = `❌ <@${this.player2}> não aceitou o desafio de <@${this.player1}>`;
            this.status = 'Recusado';
            return true;
          } else if ('✅' == reaction.emoji.name && user.id == this.player2) {
            return true;
          } else {
            reaction.message.reactions.resolve(reaction).users.remove(user);
            return false;
          }
        },
        { max: 1, time: 60000, errors: ['time'] }
      )
      .then((collected) => {
        if (collected.first().emoji.name === '✅') {
          this.drawBoard();
          this.waitingChallenge = false;
          this.gameBoard.reactions.removeAll().then(() => {
            this.addReactions();
          });
        } else if (collected.first().emoji.name === '❌') {
          this.removePlayersPlaying();
          this.drawBoard(this.challengeMessage);
          this.gameBoard.reactions.removeAll();
          delete games[this.gameBoard.id];
        }
      })
      .catch(() => {
        this.removePlayersPlaying();
        this.status = 'Sem resposta';
        this.drawBoard(
          `⏰ <@${this.player2}> não respondeu ao desafio de <@${this.player1}>`
        );
        this.gameBoard.reactions.removeAll();
        delete games[this.gameBoard.id];
      });
  }

  checkForWinner(user) {
    let isWin = false;
    let velha = true;

    this.board.forEach((position) => {
      if (position == '-') {
        velha = false;
      }
    });

    winSequences.forEach((sequence) => {
      if (
        (this.board[sequence[0]] == this.currentSymbol &&
          this.board[sequence[1]] == this.currentSymbol &&
          this.board[sequence[2]] == this.currentSymbol) ||
        velha
      ) {
        isWin = true;
        this.status = 'Finalizado';
        if (velha) {
          this.drawBoard(`\`\`\`Deu velha!\`\`\``);
        } else {
          this.drawBoard(
            `\`\`\`${user ? user.username : client.user.username} (${
              this.currentSymbol
            }) ganhou!!!\`\`\``
          );
        }
        this.currentPlayer = '';
        this.currentSymbol = '';
        this.gameBoard.reactions.removeAll();
        this.removePlayersPlaying();
        this.handleTimeout(true);
        delete games[this.gameBoard.id];
        return;
      }
    });

    return isWin;
  }

  drawBoard(other) {
    let players = `<@${this.player1}> 🆚 <@${this.player2}>`;
    let status = `**Status:** ${this.status}`;
    let info = `**Reações:**\n🔢 - Posições no tabuleiro\n❌ - Cancelar partida`;
    let gameBoard = `\`\`\`\n     |     |     \n  ${this.board[0]}  |  ${this.board[1]}  |  ${this.board[2]}  \n_____|_____|_____\n     |     |     \n  ${this.board[3]}  |  ${this.board[4]}  |  ${this.board[5]}\n_____|_____|_____\n     |     |     \n  ${this.board[6]}  |  ${this.board[7]}  |  ${this.board[8]}  \n     |     |     \n\`\`\``;
    let message;

    if (other) {
      message = `${players}\n${status}\n${other}`;
    } else {
      message = `${players}\n${status}\n\n${info}\n${gameBoard}`;
    }

    this.gameBoard.edit(message);
  }

  addReactions() {
    reactionButtons.forEach(async (emote) => {
      await this.gameBoard.react(emote);

      if (reactionButtons.indexOf(emote) === reactionButtons.length - 1) {
        this.status = `Aguardando jogada de <@${this.player1}> (${this.currentSymbol})`;
        this.drawBoard();
        this.handleTimeout();
      }
    });
  }

  makePlay(reaction, user) {
    if (this.waitingChallenge) return;

    if (!reactionButtons.includes(reaction.emoji.name)) {
      reaction.remove();
      return;
    }

    if (
      reaction.emoji.name == '❌' &&
      (user.id == this.player1 || user.id == this.player2)
    ) {
      this.status = 'Cancelado';
      this.drawBoard(' ');
      reaction.message.reactions.removeAll();
      this.removePlayersPlaying();
      this.handleTimeout(true);
      delete games[this.gameBoard.id];
      return;
    }

    if (user.id != this.currentPlayer || this.status === 'Criando jogo') {
      reaction.message.reactions.resolve(reaction).users.remove(user);
      return;
    }

    this.board[
      reactionButtons.indexOf(reaction.emoji.name)
    ] = this.currentSymbol;

    if (this.checkForWinner(user)) return;

    this.currentPlayer =
      this.currentPlayer == this.player1 ? this.player2 : this.player1;
    this.currentSymbol = this.currentSymbol == 'X' ? 'O' : 'X';
    reaction.remove();

    this.status = `Aguardando jogada de <@${this.currentPlayer}> (${this.currentSymbol})`;
    this.drawBoard();

    this.handleTimeout();

    if (this.currentPlayer == client.user.id) {
      this.machinePlay();
    }
  }

  machinePlay() {
    let availablePositions = [];
    this.board.forEach((value, position) => {
      if (value != 'X' && value != 'O') {
        availablePositions.push(position);
      }
    });

    const position =
      availablePositions[Math.floor(Math.random() * availablePositions.length)];

    this.board[position] = this.currentSymbol;

    if (this.checkForWinner()) return;

    this.currentPlayer =
      this.currentPlayer == this.player1 ? this.player2 : this.player1;
    this.currentSymbol = this.currentSymbol == 'X' ? 'O' : 'X';
    this.gameBoard.reactions.resolve(reactionButtons[position]).remove();
    this.status = `Aguardando jogada de <@${this.currentPlayer}> (${this.currentSymbol})`;
    this.drawBoard();
    this.handleTimeout();
  }

  removePlayersPlaying() {
    playing.splice(playing.indexOf(this.player1), 1);
    if (this.player2 != client.user.id) {
      playing.splice(playing.indexOf(this.player2), 1);
    }
  }
}

let games = {};
let playing = [];

client.on('message', async (message) => {
  if (message.author.bot || message.type === 'dm') return;

  if (
    message.content.split(' ')[0] === '!!jogar' ||
    message.content.split(' ')[0] === '!!desafiar'
  ) {
    if (
      message.content.split(' ')[0] === '!!desafiar' &&
      !message.mentions.users.first()
    ) {
      message.reply('Você deve mencionar o usuario: `!!desafiar @usuario`');
      return;
    }

    if (message.mentions.users.first()) {
      if (message.mentions.users.first().id == message.author.id) {
        message.reply('Você não pode se desafiar ;-;.');
        return;
      }
      if (
        playing.includes(message.mentions.users.first().id) &&
        !message.mentions.users.first().bot
      ) {
        message.reply('Já existe um jogo acontecendo com a pessoa desafiada.');
        return;
      }
    }
    if (playing.includes(message.author.id)) {
      message.reply('você já está em uma partida.');
      return;
    }

    await message.channel.send('Iniciando...').then((board) => {
      games[board.id] = new TicTacToe(
        message,
        board,
        message.content.split(' ')[0].includes('desafiar')
      );
    });
  }

  if (message.content.split(' ')[0] === '!!ajuda') {
    message.channel.send(
      '**- Sobre - **\n:video_game:  Criado com técnicas XGH, este bot tem como o objetivo permitir a criação de partidas de jogo da velha contra outros usuários e também contra o próprio bot (tadinho, ele joga em posições aleatórias do tabuleiro).\n\n** - Comandos -**\n`!!ajuda` - mostra essa mensagem ¯\\_(ツ)_/¯\n`!!jogar` - inicia um jogo contra o Cleiton (bot)\n`!!desafiar @Usuario` - desafia o usuário mencionado\n\n**- Como jogar -**\nAs jogadas são feitas com as reações da mensagem, cada número representa uma posição do tabuleiro, de :one: à :nine:.\nPara cancelar uma partida ou recusar um desafio reaja com :x:\nPara aceitar um desafio reaja com :white_check_mark:'
    );
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  if (user.bot || !games[reaction.message.id]) return;

  games[reaction.message.id].makePlay(reaction, user);
});

client.login(process.env.BOT_TOKEN);
