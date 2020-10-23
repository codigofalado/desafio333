import { Message, MessageEmbed } from 'discord.js';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando ban', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Apenas um comandinho pra botar medo hihihi :heart:')
  .addFields([
    { name: 'Modo de usar', value: `\`${process.env.PREFIX}ban <@user>\` - Retorna uma mensagem dizendo que a pessoa marcada foi banida.` },
    { name: 'Parâmetros', value: `\`@user\` - O usuário que você deseja botar aquele medo. Deve ser menção.` }

  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'ban',
  args: true,
  usage: helpEmbed,
  guildOnly: true,
	description: 'Exibe uma mensagem de banimento para a pessoa marcada.',
	execute(message: Message, _: Array<string>) {
    if (!message.mentions.users.size) {
      return message.reply('Você não marcou ninguem!')
    }

    const mentionedUser = message.mentions.users.first();

		return message.channel.send(`O usuário ${mentionedUser?.username} foi banido`);
	},
};