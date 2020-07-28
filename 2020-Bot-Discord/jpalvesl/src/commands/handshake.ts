import { Message, MessageEmbed } from 'discord.js';
import { prefix } from '../../config.json';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando handshake', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Aperta a mão de outra usuário.')
    .addFields([
    { name: 'Modo de usar', value: `\`${prefix}handshake <@user>\`` },
    { name: 'Parâmetros', value: `\`@user\` - O usuário que você quer interagir.` }

  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'handshake',
  args: true,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Aperta a mão do primeiro usuário marcado.',
	execute(message: Message, args: Array<string>) {
    if (!message.mentions.users.size) {
      return message.channel.send('Você deve mencionar alguem para esse comando funcionar')
    }

    const userMention = message.mentions.users.first()
    

		message.channel.send(`${message.author.username}     :handshake:     ${userMention?.username}`);
	},
};