import { Message, MessageEmbed } from 'discord.js';
import { prefix } from '../../config.json';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando play', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Da play em uma música que você escolheu.')
  .addFields([
    { name: 'Modo de usar', value: `\`${prefix}play <nome da musica>\` - .` },
    { name: 'Parâmetros', value: `\`nome da musica\` - .` }

  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'play',
  args: false,
  usage: helpEmbed,
  guildOnly: true,
	description: 'Enter inside the channel and play an audio!',
	async execute(message: Message, args: Array<string>) {

	},
};