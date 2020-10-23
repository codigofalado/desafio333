import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';
import qs from 'qs';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando make-meme', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Cria um meme baseado no template que você escolheu.')
  .addFields([
    { name: 'Modo de usar', value: `\`${process.env.PREFIX}make-meme <template> [<frase>]\`` },
    { name: 'Parâmetros', value: `\`template\` - O template que você quer.\n\`frase\` - Cada frase presente nos espaços a serem completados, separados por pelo caractere |` },
    { name: 'Templates', value: `*1* -> [Exemplo](https://i.imgflip.com/4957ql.jpg)\n*2* -> [Exemplo](https://i.imgflip.com/4957tg.jpg)\n*3* -> [Exemplo](https://i.imgflip.com/4957tp.jpg)\n*4* -> [Exemplo](https://i.imgflip.com/4957tw.jpg)\n*5* -> [Exemplo](https://i.imgflip.com/4957ye.jpg)` }
  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'make-meme',
  args: true,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Cria um meme com base nos templates disponiveis no bot.',
	async execute(message: Message, args: Array<string>) {
    let template = Number(args.shift())

    if (isNaN(template)) return message.reply('O template passado deve ser um número')

    switch (template) {
      case 1: //Drake Hotline Bling
        template = 181913649;
        break;
    case 2: //Distracted Boyfriend
      template = 112126428;
      break;
    case 3: // Two Buttons
      template = 87743020;
      break;
    case 4: // UNO Draw 25 Cards
      template = 217743513;
      break;
    case 5: // Expanding Brain
      template = 93895088;
      break;
      default:
        return message.channel.send('O template passado não é válido')
    }

    const boxes = args
      .join(' ')
      .split('|')
      .map(text => ( { text: text.trim() } ))

    const params = qs.stringify({
      template_id: template,
      username: process.env.LOGINMEME,
      password: process.env.PASSWORDMEME,
      boxes
    })
    
    const { data } = await axios.post(`https://api.imgflip.com/caption_image?${params}`)

    return message.channel.send(data.data.url)
	},
};