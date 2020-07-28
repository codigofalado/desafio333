import { Message, MessageEmbed } from 'discord.js';
import { prefix } from '../../config.json';


module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'help',
  args: false,
  usage: '',
  guildOnly: false,
	description: 'Comando que retorna um embed com todos os comandos presentes no bot.',
	execute(message: Message, args: Array<string>) {
    const helpEmbed = new MessageEmbed()
      .setColor('#860c40')
      .setTitle('Kurisu ajuda')
      .setDescription('Bot criando como desafio333 - Bot-Discord')
      .setURL('https://github.com/jpalvesl/kurisu')
      .setAuthor('Kurisu', 'https://cdn.discordapp.com/avatars/724090193153622096/a02d4db5a8f5d962f2d0c1cb53bbbb1c.png', 'https://github.com/jpalvesl/kurisu')
      .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
      .addFields(
        // \`\`
        { name: 'Comandos de informações', value: `\`help\` \`avatar\` \`invite\` \`roleinfo\` \`serverinfo\`` }, 
        { name: 'Comandos de interação', value: `\`ping\` \`beep\` \`ban\` \`hug\` \`kiss\` \`highfive\` \`smile\` \`poke\` \`slap\` \`tickle\`` },
        { name: 'Comando diversos', value: `\`coronga\` \`coinflip\` \`roll\` \`random-number\` \`8ball\` \`createpoll\` \`randomfact\`` },
        { name: 'Comandos de imagem/gifs', value: `\`gif\` \`filter\`` }
      )
      .setTimestamp()
      .setFooter(`Para verificar a forma de usar o comando digite o comando ${prefix}help <comando>`, 'https://cdn.discordapp.com/avatars/724090193153622096/a02d4db5a8f5d962f2d0c1cb53bbbb1c.png')

		message.channel.send(helpEmbed);
	},
};