import { Message, MessageEmbed } from 'discord.js';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando beep', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Interação bem bestinha com o bot, parabéns você sabe falar com os robôs.')
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'beep',
  args: false,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Beep!',
	execute(message: Message, args: Array<string>) {
		message.channel.send(':robot: Boop.');
	},
};