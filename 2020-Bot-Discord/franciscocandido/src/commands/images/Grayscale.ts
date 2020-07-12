import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import fs from 'fs';
import jimp from 'jimp';

export default class GrayscaleCommand extends Command {
	public constructor() {
		super('grayscale', {
			aliases: ['grayscale'],
			category: 'images',
			description: {
				content: 'Adiciona um efeito preto e branco a uma imagem',
				usage: 'grayscale <link para a imagem>',
				exemples: [
					'grayscale https://cdn.discordapp.com/avatars/377239979622924290/d2c025ccadbc588a3f97c66f6c6ea895.png'
				]
			},
			ratelimit: 1,
			channel: 'guild',
			args: [
				{
					id: 'link',
					type: 'string',
					match: 'content',
					prompt: {
						start: 'Qual o link da imagem?'
					}
				}
			]
		});
	}

	public async exec(message: Message, { link }: { link: string }) {
		try {
			let fileName = `${message.author.username}-${
				message.author.id
			}-${Date.now()}.jpg`;

			let awaitMessage = await message.channel.send(
				':hourglass_flowing_sand: Aguarde...'
			);

			await jimp.read(link).then(async (image) => {
				image.grayscale();

				image.write(fileName);
			});

			await message.channel.send('', { files: [`${fileName}`] });

			message.delete();
			awaitMessage.delete();
			fs.unlinkSync(fileName);
		} catch (erro) {
			console.log('[ERRO]', erro);
			return message.channel.send(
				':confused: Algo de errado aconteceu, tente novamente mais tarde.'
			);
		}
	}
}
