import { Message, MessageEmbed, Role } from 'discord.js';
import { prefix } from '../../config.json';

function formatRoles(rolesArray: Array<string>) {
  return rolesArray.map(role => {
    const words = role.split('_')
    
    const capitalizedWords = words.map(word => (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))
    return capitalizedWords.join(' ')
  })
}

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando roleinfo', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Mostra informações sobre um determinado cargo.')
  .addFields([
    { name: 'Modo de usar', value: `\`${prefix}roleinfo <cargo>\` - Retorna informações sobre um cargo.` },
    { name: 'Parâmetros', value: `\`cargo\` - Cargo que você quer olhar as informações.` }

  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'roleinfo',
  args: true,
  usage: helpEmbed,
  guildOnly: true,
	description: 'Lista informações sobre o cargo que você passou o nome como parâmetro.',
	execute(message: Message, args: Array<string>) {
    const roles = message.guild?.roles.cache.map(role => role)
    const filteredRoles = roles?.filter(role => role.name.toLowerCase() === args[0].toLowerCase())
    const createdDate = filteredRoles[0].createdAt
    const today = new Date()


    if (filteredRoles?.length === 0) {
      return message.channel.send(`:x: Não foi possivel encontrar o cargo com esse nome :(`)
    }
    const selectedRole: Role = filteredRoles[0]
    const formatedDate = `${createdDate.getDate()}/${createdDate.getMonth()}/${createdDate.getFullYear()}`
    const days = Math.ceil((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24))
    const rolesName = formatRoles(selectedRole.permissions.toArray())
    const roleInfo = new MessageEmbed()
      .setColor('#000000')
      .setAuthor(`Informações do cargo ${selectedRole.name}`, `${message.guild?.iconURL({ format: "png", dynamic: true })}`)    
      .setDescription(`:small_blue_diamond: **ID do cargo**: ${selectedRole.id}
      :small_blue_diamond: **Data de criação**: ${formatedDate}
      :small_blue_diamond: **Idade**: ${days}
      :small_blue_diamond: **Cor**: ${selectedRole.hexColor || 'None'}
      :small_blue_diamond: **Membros**: ${selectedRole.members.size}
      :small_blue_diamond: **Hoisted**: ${selectedRole.hoist}
      `)
      .addField(`Permissions: [${rolesName.length}]`, `${rolesName.join(', ')}`)

    message.channel.send(roleInfo);
	},
};