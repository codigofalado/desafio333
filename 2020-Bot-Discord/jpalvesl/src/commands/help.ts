import { Message, MessageEmbed, Collection } from 'discord.js';
import { commandInterface } from '../index';

import { prefix } from '../../config.json';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando help', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Eu espero que seja isso que você está procurando...')
  .addFields([
    { name: 'Modo de usar', value: `\`${prefix}help <comando>\`` },
    { name: 'Parâmetros', value: `\`comando\` - O nome do comando que você deseja verificar as informações sobre.` }

  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'help',
  args: false,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Retorna uma mesangem com todos os comandos presentes no bot e também caso você passe o nome do comando como parâmetro ele lista informações sobrbe o comando específico.',
	execute(message: Message, args: Array<string>, commands: Collection<string, commandInterface>) {
    if (args.length) {
      if (!commands.has(args[0])) return message.channel.send(':x: Não existe comando com esse nome')
      const command = commands.get(args[0])

      return message.channel.send(command?.usage)
    }

    const helpEmbed = new MessageEmbed()
      .setColor('#860c40')
      .setAuthor('Kurisu ajuda', 'https://cdn.discordapp.com/avatars/724090193153622096/a02d4db5a8f5d962f2d0c1cb53bbbb1c.png', 'https://github.com/jpalvesl/kurisu')
      .setDescription('Bot criando como desafio333 - Bot-Discord\nPara Mais informações sobre os comando acesse o [site]().')
      .setURL('https://github.com/jpalvesl/kurisu')
      .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
      .addFields(
        { name: 'Comandos de informações', value: `\`help\` \`avatar\` \`invite\` \`roleinfo\` \`serverinfo\`` }, 
        { name: 'Comandos de interação', value: `\`ping\` \`beep\` \`ban\` \`hug\` \`kiss\` \`highfive\`` },
        { name: 'Comando diversos', value: `\`corona\` \`weather\`  \`coinflip\` \`roll\` \`random-number\` \`8ball\` \`search\` \`morse\` \`base64\` \`pokedex\`` },
        { name: 'Comandos de imagem/gifs', value: `\`gif\` \`filter\` \`make-meme\`` }
      )
      .setFooter(`Para verificar a forma de usar o comando digite o comando ${prefix}help <comando>`, 'https://cdn.discordapp.com/avatars/724090193153622096/a02d4db5a8f5d962f2d0c1cb53bbbb1c.png')

		message.channel.send(helpEmbed);
	},
};