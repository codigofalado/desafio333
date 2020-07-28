import { Message } from 'discord.js';
import jimp from 'jimp';
import path from 'path';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'filter',
  args: false,
  usage: '[<comandos possiveis>]',
  guildOnly: false,
	description: 'Comando que retorna uma imagem passada pelo usuário com os parâmetros passados pelo mesmo',
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

      //console.log(message)
      const imagePath = path.resolve(__dirname, '..', 'assets', 'testezin.jpg')
      image.write(imagePath)
      return message.reply(`Sua imagem com os filtros pedidos aplicados`, { files: [imagePath] });
    } catch (error) {
      return message.channel.send('Erro ao carregar imagem')
    }
    

	},
};