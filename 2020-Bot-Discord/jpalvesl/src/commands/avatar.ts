import { Message } from 'discord.js';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'avatar',
  args: false,
  usage: '',
  guildOnly: false,
	description: 'Mostra o avatar de todas as pessoas mencionadas, e caso ninguem seja mencionado mostra o avatar de quem chamou o comando',
	execute(message: Message, args: Array<string>) {
    if (!message.mentions.users.size) {
      message.channel.send(`Seu avatar é esse: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);

    }
    const avatarList = message.mentions.users.map(user => {
      return `O avatar de ${user.username} é esse: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`
    })

    return message.channel.send(avatarList)
	},
};