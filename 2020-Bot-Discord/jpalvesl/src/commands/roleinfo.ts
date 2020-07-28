import { Message, MessageEmbed, Role, Permissions } from 'discord.js';

function formatRoles(rolesArray: Array<string>) {
  return rolesArray.map(role => {
    const words = role.split('_')
    
    const capitalizedWords = words.map(word => (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))
    return capitalizedWords.join(' ')
  })
}

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'roleinfo',
  args: false,
  usage: '<role>',
  guildOnly: false,
	description: 'Lista informações sobre o cargo',
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