import { Message } from 'discord.js';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'coinflip',
  args: false,
  usage: '',
  guildOnly: true,
	description: 'Roll the die!',
	execute(message: Message, args: Array<string>) {
    const result = Math.floor(Math.random() * 2)

		message.channel.send(result ? 'cara' : 'coroa');
	},
};