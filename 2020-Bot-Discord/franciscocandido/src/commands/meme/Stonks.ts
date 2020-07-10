import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import fs from 'fs';
import jimp from 'jimp';

export default class StonksCommand extends Command {
	public constructor() {
		super('stonks', {
			aliases: ['stonks', 'stonksMeme'],
			category: 'meme',
			description: {
				content: 'Faça uma versão do meme Stonks',
				usage: 'stonks',
				exemples: [
					'stonks',
					'stonks Ai você aceita o troco em balas na padaria'
				]
			},
			ratelimit: 1,
			channel: 'guild',
			args: [
				{
					id: 'text',
					type: 'string',
					match: 'content',
					prompt: {
						start: 'Qual a frase?'
					}
				}
			]
		});
	}

	public async exec(message: Message, { text }) {
		try {
			let templateUrl =
				'https://cdn.discordapp.com/attachments/730043354661781536/730043505958715402/stonks.jpg';

			let fileName = `${message.author.username}-${
				message.author.id
			}-${Date.now()}.jpg`;

			let awaitMessage = await message.channel.send(
				':hourglass_flowing_sand: Seu meme ta quase pronto...'
			);

			await jimp.read(templateUrl).then(async (template) => {
				let font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);

				template.print(font, 0, 0, text, 750);
				template.write(fileName);
			});

			await message.channel.send('', { files: [`${fileName}`] });

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
