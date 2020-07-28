import { Message, MessageEmbed } from 'discord.js';
import { prefix } from '../../config.json';

const wordToCode = new Map([
  ['a', '.-'], ['b', '-...'], ['c', '-.-.'], ['d', '-..'], ['e', '.'], ['f', '..-.'], ['g', '--.'], ['h', '....'], ['i', '..'], ['j', '.---'], ['k', '-.-'], ['l', '.-..'], ['m', '--'], ['n', '-.'], ['o', '---'], ['p', '.--.'], ['q', '--.-'], ['r', '.-.'], ['s', '...'], ['t', '-'], ['u', '..-'], ['v', '...-'], ['w', '.--'], ['x', '-..-'], ['y', '-.--'], ['z', '--..'], [' ', '/'], ['1', '.----'], ['2', '..---'], ['3', '...--'], ['4', '....-'], ['5', '.....'], ['6', '-....'], ['7', '--...'], ['8', '---..'], ['9', '----.'], ['0', '-----'], ['.', '.-.-.-'], [',', '--..--'], ['?', '..--..'], ['\'', '.----.'], ['!', '-.-.--'], ['/', '-..-.'], ['(', '-.--.'], [')', '-.--.-'], ['&', '.-...'], [':', '---...'], [';', '-.-.-.'], ['=', '-...-'], ['-', '-....-'], ['_', '..--.-'], ['"', '.-..-.'], ['$', '...-..-'], ['@', '.--.-.']
])

const codeToWord =  new Map([
  ['.-', 'a'], ['-...', 'b'], ['-.-.', 'c'], ['-..', 'd'], ['.', 'e'], ['..-.', 'f'], ['--.', 'g'], ['....', 'h'], ['..', 'i'], ['.---', 'j'], ['-.-', 'k'], ['.-..', 'l'], ['--', 'm'], ['-.', 'n'], ['---', 'o'], ['.--.', 'p'], ['--.-', 'q'], ['.-.', 'r'], ['...', 's'], ['-', 't'], ['..-', 'u'], ['...-', 'v'], ['.--', 'w'], ['-..-', 'x'], ['-.--', 'y'], ['--..', 'z'], ['/', ' '], ['.----', '1'], ['..---', '2'], ['...--', '3'], ['....-', '4'], ['.....', '5'], ['-....', '6'], ['--...', '7'], ['---..', '8'], ['----.', '9'], ['-----', '0'], ['.-.-.-', '.'], ['--..--', ','], ['..--..', '?'], ['.----.', '\''], ['-.-.--', '!'], ['-..-.', '/'], ['-.--.', '('], ['-.--.-', ')'], ['.-...', '&'], ['---...', ':'], ['-.-.-.', ';'], ['-...-', '='], ['-....-', '-'], ['..--.-', '_'], ['.-..-.', '\"'], ['...-..-', '$'], ['.--.-.', '@'],
])

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando morse', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Transforma sua frase em código morse, ou seu código morse em frase')
  .addFields([
    { name: 'Modo de usar', value: `\`${prefix}morse <função> <frase>\`` },
    { name: 'Parâmetros', value: `\`frase\` - frase a ser codificado ou decodificada.\n\`\`função\` - pode ser *encode* ou *decode*` }
  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'morse',
  args: true,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Retorna uma mesangem com todos os comandos presentes no bot e também caso você passe o nome do comando como parâmetro ele lista informações sobrbe o comando específico.',
	execute(message: Message, args: Array<string>) {
    const commandType = args.shift()
    
    if (!args.length) return;  


    if (commandType === 'encode') {
      let encodedMessage = '';
      for (const letra of args.join(' ').toLowerCase()) {
        if (!wordToCode.has(letra)) continue

        const code = wordToCode.get(letra)
        encodedMessage += code + ' '
      }

      return message.channel.send(`**A messagem codificada é a seguinte**:\n${encodedMessage.trim()}`)
    }
    else if (commandType === 'decode') {
      const encodedArray = args

      const decodedMessage = encodedArray.map(code => {
        if (codeToWord.has(code)) {
          return codeToWord.get(code)
        }
      })
      .filter(letra => letra)
      .join('')

      return message.channel.send(`**A messagem decodificada é a seguinte**:\n${decodedMessage}`)
    }
	},
};