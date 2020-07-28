import { Message, MessageEmbed } from 'discord.js';
import { prefix } from '../../config.json';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando serverinfo', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Mostra as estatísticas do servidor atual.')
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'serverinfo',
  args: false,
  usage: helpEmbed,
  guildOnly: true,
	description: 'Lista informações sobre o canal.',
	execute(message: Message, args: Array<string>) {
    const uniqueUsers = message.guild?.members.cache.map(member => member.user)
    const onlineUsers = message.guild?.presences.cache.map(user => user.user)
    const ownerName = uniqueUsers?.filter(user => user.id === message.guild?.ownerID)[0].username
    const region = message.guild?.region.toUpperCase()
    const createdDate = message.guild?.createdAt
    const roleNames = message.guild?.roles.cache.map(role => {
      if (role.name !== '@everyone') {
        return role.name
      }
    }).filter(role => role)
    const channels = message.guild?.channels.cache.map(channel => {
      if (channel.type === 'text' || channel.type ==='voice') return channel
    })
    const textChannels = channels?.filter(channel => channel?.type === 'text').length
    const voiceChannels = channels?.filter(channel => channel?.type === 'voice').length
    const formatedDate = `${createdDate?.getDate()}/${createdDate?.getMonth()}/${createdDate?.getFullYear()}\n${createdDate?.getHours()}:${createdDate?.getMinutes()}`

    const serverInfo = new MessageEmbed()
      .setColor('#ffffff')
      .setDescription(`Informações do servidor para ${message.guild?.name}`)
      .setThumbnail(`${message.guild?.iconURL({ format: "png", dynamic: true })}`)
      .setAuthor('Informações do servidor', `${message.guild?.iconURL({ format: "png", dynamic: true })}`)
      .addFields(
        { name: 'Usuários (Online/Únicos)', value: `${onlineUsers?.length}/${uniqueUsers?.length}`, inline: true },
        { name: 'Data de criação', value: formatedDate, inline: true },
        { name: 'Canais Voz/Texto', value: `${voiceChannels}/${textChannels}`, inline: true },
        { name: 'Dono do servidor', value: `${ownerName}`, inline: true },
        { name: 'Região', value: `${region}`, inline: true },
      )
      .addField('Cargos', `${roleNames?.join(',\n')}`)
      .setFooter(`Server ID: ${message.guild?.id}`)
		return message.channel.send(serverInfo);
	},
};