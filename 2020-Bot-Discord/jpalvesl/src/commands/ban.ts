import { Message } from 'discord.js';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'ban',
  args: true,
  usage: '<user>',
  guildOnly: true,
	description: 'Um comando basicamente pra trollar e fingir que você está banindo alguem',
	execute(message: Message, args: Array<string>) {
    if (!message.mentions.users.size) {
      return message.reply('Você não marcou ninguem!')
    }

    const mentionedUser = message.mentions.users.first();

		return message.channel.send(`O usuário ${mentionedUser?.username} foi banido`);
	},
};