import { Message } from 'discord.js';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'beep',
  args: false,
  usage: '',
  guildOnly: true,
	description: 'Beep!',
	execute(message: Message, args: Array<string>) {
		message.channel.send(':heart: Beep.');
	},
};