import { Message, MessageEmbed } from 'discord.js';
import { prefix } from '../../config.json';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando random-number', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Gera um número aleatório com base num intervalo determinado pelo usuário.')
  .addFields([
    { name: 'Modo de usar', value: `\`${prefix}random-number <numero1> <numero2>\`` },
    { name: 'Parâmetros', value: `\`numero1\`, \`numero2\` - Numeros que vão definir o intervalo em que o número aleatório deve ser gerado. O primeiro parâmetro deve ser menor que o segundo.` }

  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'random-number',
  args: true,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Gera um número aleatório no intervalo do primeiro parâmetro até o segundo, sem contar com ele.',
	execute(message: Message, args: Array<string>) {
    let number1 = parseInt(args[0])
    let number2 = parseInt(args[1])

    if (isNaN(number1) || isNaN(number2)) return message.channel.send(':negative_squared_cross_mark: Algum dos parâmetros passados não é um número.');

    if (number1 >= number2) return message.channel.send(':negative_squared_cross_mark: O primeiro número deve ser menor que o segundo.'); 
  
    const result = Math.floor(number1 + Math.random() * number2)

    return message.channel.send(`:white_check_mark: O número obtido foi ${result}`)
  },
};