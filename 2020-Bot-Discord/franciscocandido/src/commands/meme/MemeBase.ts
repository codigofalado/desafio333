import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';

interface randomMeme {
	id: string;
	name: string;
	url: string;
	width: number;
	height: number;
}

export default class MemeBase extends Command {
	public constructor() {
		super('baseMeme', {
			aliases: ['baseMeme', 'memeTemplate', 'bm'],
			category: 'meme',
			ratelimit: 2,
			channel: 'guild'
		});
	}

	public async exec(message: Message) {
		try {
			let meme = await axios
				.get('https://api.imgflip.com/get_memes')
				.then((data) => data.data);

			let memeArray: [] = meme.data.memes;
			let randomNumber: number = Math.floor(Math.random() * memeArray.length);
			let randomMeme: randomMeme = meme.data.memes[randomNumber];
			console.log(randomMeme);

			return message.channel.send(
				new MessageEmbed()
					.setColor('00CEB3')
					.setTitle(`Nome: ${randomMeme.name}`)
					.addFields(
						{
							name: ':id: ID no Imgflip',
							value: `${randomMeme.id}`,
							inline: true
						},
						{
							name: ':frame_photo: Tamanho',
							value: `${randomMeme.width} x ${randomMeme.height}`,
							inline: true
						}
					)
					.setDescription(
						`Clique [aqui](${randomMeme.url}) para baixar a imagem.`
					)
					.setImage(`${randomMeme.url}`)
					.setFooter(`Imagem requisitada por ${message.author.username}`)
					.setTimestamp()
			);
		} catch (erro) {
			console.log('[ERRO]', erro);
			return message.channel.send(
				':confused: Algo de errado aconteceu, tente novamente mais tarde.'
			);
		}
	}
}
