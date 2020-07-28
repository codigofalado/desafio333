import { Message, MessageEmbed } from 'discord.js';
import { prefix } from '../../config.json';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando ping', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Joga um ping pog com o bot.')
  .addFields([
    { name: 'Modo de usar', value: `\`${prefix}ping\` - Interage com o bot.` },
  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'ping',
  args: false,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Ping!',
	execute(message: Message, args: Array<string>) {
		message.channel.send(':ping_pong: Pong.');
	},
};