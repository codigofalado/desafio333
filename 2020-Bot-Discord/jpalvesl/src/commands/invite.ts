import { Message, MessageEmbed } from 'discord.js';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando invite', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Retorna para você um link de um convite OAuth e alguns outros links importantes.')
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'invite',
  args: false,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Dá a você um link para adicionar o bot em no servidor que você quiser',
	execute(message: Message, args: Array<string>) {
    const invite = new MessageEmbed()
      .setTitle('URL do convite da Kurisu')
      .setDescription('Aqui está a URL que é utilizada para você adicionar o bot em algum dos seus servidores do discord, caso você queira. **Obrigado por usar o bot**')
      .setAuthor('Kurisu', 'https://cdn.discordapp.com/avatars/724090193153622096/a02d4db5a8f5d962f2d0c1cb53bbbb1c.png')
      .addFields(
        { name: 'URL do convite', value: 'https://discord.com/oauth2/authorize?client_id=724090193153622096&scope=bot&permissions=8' },
        { name: 'Código fonte do bot', value: 'https://github.com/jpalvesl/kurisu' },
      )
      .setTimestamp()
      .setFooter('Espero que você se divirta com o bot :)', 'https://cdn.discordapp.com/avatars/724090193153622096/a02d4db5a8f5d962f2d0c1cb53bbbb1c.png')
		message.channel.send(invite);
	},
};