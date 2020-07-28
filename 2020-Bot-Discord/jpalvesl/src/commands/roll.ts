import { Message } from 'discord.js';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'roll',
  args: false,
  usage: '<tipo> <vezes>',
  guildOnly: false,
	description: 'Rola o dado a quantidade de vezes que você especificou',
	execute(message: Message, args: Array<string>) {
    const result = Math.floor(Math.random() * 6) + 1

		message.channel.send(`:game_die: ${result}.`);
	},
};