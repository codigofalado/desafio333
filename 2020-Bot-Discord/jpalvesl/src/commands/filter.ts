import { Message, MessageEmbed } from 'discord.js';
import jimp from 'jimp';
import path from 'path';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando filter', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Comando que aplica filtros em uma imagem, que pode ser passada uma url ou uma imagem upada por você mesmo no discord.')
  .addFields([
    { name: 'Modos de usar', value: `\`${process.env.PREFIX}filter <url> [<filtro>]\` - Retorna uma imagem com os filtros devidamente aplicados.\n \`!filter [<filtro>]\` - Esse comando pode ser enviado no comentário de uma imagem que você mesmo upou no discord.` },
    { name: 'Parâmetros', value: '`filtro` - Filtro a ser passados na imagem. Pode passar mais de um filtro por vez.\n *Tipos de filtro*: `greyscale`, `blur`, `sepia`, `invert-color`, `pixel`, `flip-x`, `flip-y`, `red`, `blue`, `green`.' }
  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'filter',
  args: true,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Retorna uma imagem passada pelo usuário com os filtros passados como parâmetros pelo mesmo.',
	async execute(message: Message, args: Array<string>) {
    try {
      let image;
      if (message.attachments.first()?.url) {
        image = await jimp.read(`${message.attachments.first()?.url}`)
      } 
      else if (args.length > 1 && args[0].startsWith('http')) {
        image = await jimp.read(args[0])
      } 
      else {
        return console.log('Você não passou nenhuma imagem')
      }

      let control = 0
      if (args.includes('greyscale')) {
        image = image.greyscale()
        control++
      }

      if (args.includes('blur')) {
        image = image.blur(5)
        control++
      }

      if (args.includes('sepia')) {
        image = image.sepia()
        control++
      }
      
      if (args.includes('invert-color')) {
        image = image.invert()
        control++
      }

      if (args.includes('pixel')) {
        image = image.pixelate(5)
        control++
      }

      if (args.includes('flip-x')) {
        image = image.flip(true, false)
        control++
      }

      if (args.includes('flip-y')) {
        image = image.flip(false, true)
        control++
      }

      if (args.includes('red')) {
        image = image.color([{ apply: 'red', params: [100] }])
        control++
      }
      
      if (args.includes('blue')) {
        image = image.color([{ apply: 'blue', params: [100] }])
        control++
      }
      
      if (args.includes('green')) {
        image = image.color([{ apply: 'green', params: [100] }])
        control++
      }

      if (!control) return console.log('Nenhum filtro válido aplicado')

      
      const imagePath = path.resolve(__dirname, '..', 'assets', 'testezin.jpg')
      image.write(imagePath)
      return message.reply(`Sua imagem com os filtros pedidos aplicados`, { files: [imagePath] });
    } catch (error) {
      console.log('Erro ao executar o comando')
      return message.channel.send(':x: Ocorreu um erro ao executar o comando, tente novamente')
    }
    

	},
};