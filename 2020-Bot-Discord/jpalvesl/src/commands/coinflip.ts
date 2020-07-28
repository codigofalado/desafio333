import { Message, MessageEmbed } from 'discord.js';
import { prefix } from '../../config.json';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando coinflip', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Joga a moeda um numero determinado de repetições')
  .addFields([
    { name: 'Modo de usar', value: `\`${prefix}coinflip <vezes>\` - Joga a moeda x o numero de vezes.` },
    { name: 'Parâmetros', value: `\`vezes\` - Quantidade de vezes que você quer que a moeda. Caso não seja passado nenhum valor o padrão será 1.` }
  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'coinflip',
  args: false,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Gira a moeda com um numero definido de repetições.',
	execute(message: Message, args: Array<string>) {
    let cara = 0;
    let coroa = 0;
    let times = parseInt(args[0])
    if (times <= 0 || !times) times = 1; 

    for (let i = 0; i < times; i++) {
      const result = Math.floor(Math.random() * 2)
      
      if (result === 0) {
        cara++
      } 
      else {
        coroa++
      }
    }

		message.channel.send(`A moeda foi girada ${times} veze(s)\n${cara} veze(s) caiu cara\n${coroa} vezes caiu coroa`);
	},
};