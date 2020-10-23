import { Message, MessageEmbed } from 'discord.js';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando avatar', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Retorna o avatar de algum usário especifico')
  .addFields([
    { name: 'Modo de usar', value: `\`${process.env.PREFIX}avatar [@user]\` - Retorna a URL do avatar das pessoas mencionadas, e caso ninguem seja marcado será retornado da pessoa que fez a chamada.` },
    { name: 'Parâmetros', value: `\`@user\` - Os usuários que você quer a URL do avatar. Deve ser menção.` }
  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'avatar',
  args: false,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Mostra o avatar de todas as pessoas mencionadas, e caso ninguem seja mencionado mostra o avatar de quem chamou o comando.',
	execute(message: Message, _: Array<string>) {
    if (!message.mentions.users.size) {
      return message.channel.send(`Seu avatar é esse: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
    }

    const avatarList = message.mentions.users.map(user => {
      return `O avatar de ${user.username} é esse: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`
    })

    return message.channel.send(avatarList)
	},
};