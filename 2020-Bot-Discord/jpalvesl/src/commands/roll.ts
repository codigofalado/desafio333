import { Message } from 'discord.js';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'roll',
  args: false,
  usage: '',
  guildOnly: true,
	description: 'Roll the die!',
	execute(message: Message, args: Array<string>) {
    const result = Math.floor(Math.random() * 6) + 1

		message.channel.send(`:game_die: ${result}.`);
	},
};