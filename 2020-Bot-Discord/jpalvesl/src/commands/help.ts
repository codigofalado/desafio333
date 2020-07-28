import { Message, MessageEmbed } from 'discord.js';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'help',
  args: false,
  usage: '',
  guildOnly: false,
	description: 'Comando que retorna um embed com todos os comandos presentes no bot.',
	execute(message: Message, args: Array<string>) {
    const helpEmbed = new MessageEmbed()
      .setColor('#ffffff')
      .setTitle('Kurisu ajuda')
      .setURL('https://github.com/jpalvesl/kurisu')
      .setAuthor('Kurisu')

		message.channel.send(helpEmbed);
	},
};