import { Message } from 'discord.js';
import jimp from 'jimp';
import path from 'path';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'filter',
  args: false,
  usage: '[<comandos possiveis>]',
  guildOnly: false,
	description: 'Comando que retorna um embed com todos os comandos presentes no bot.',
	async execute(message: Message, args: Array<string>) {
    try {
      const image = await jimp.read(path.resolve(__dirname, '..', 'assets', 'img.jpg'))
      image
      //  .blur(5)
      //  .color([
      //     { apply: 'blue', params: [100] },
      //     { apply: 'shade', params: [100] },
      //   ]);
      // .flip(true, false)
      // .greyscale()
      // .posterize(5)
      // .pixelate(7)
      // .invert()
      // .gaussian(1)
      //.normalize()

      image.write(path.resolve(__dirname, '..', 'assets', 'testezin.jpg'))
      return message.channel.send(`Oizinho`, { files: ['testezin.jpg'] });
    } catch (error) {
      return message.channel.send('Erro ao carregar imagem')
    }
    

	},
};