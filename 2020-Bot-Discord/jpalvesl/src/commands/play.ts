import { Message } from 'discord.js';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'play',
  args: false,
  usage: '',
  guildOnly: true,
	description: 'Enter inside the channel and play an audio!',
	async execute(message: Message, args: Array<string>) {

	},
};