import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';

const IMGFLIP_USERNAME = process.env.IMGFLIP_USERNAME;
const IMGFLIP_PASSWORD = process.env.IMGFLIP_PASSWORD;

export default class Stonks extends Command {
	public constructor() {
		super('stonks', {
			aliases: ['stonks', 'stonksMeme'],
			category: 'memes',
			ratelimit: 2,
			channel: 'guild',
			args: [
				{
					id: 'text',
					type: 'string',
					prompt: {
						start: 'Qual a frase?',
						retry: 'Frase inválida'
					}
				}
			]
		});
	}

	public async exec(message: Message, { text }) {
		try {
			let meme = await axios
				.get('https://api.imgflip.com/caption_image', {
					params: {
						username: IMGFLIP_USERNAME,
						password: IMGFLIP_PASSWORD,
						template_id: 186821996,
						text0: text
					}
				})
				.then((memeData) => memeData.data);

			let url = meme.data.url;

			return message.channel.send(
				new MessageEmbed()
					.setColor('00CEB3')
					.setImage(`${url}`)
					.setFooter(`Meme criado por ${message.author.username}`)
			);
		} catch (erro) {
			console.log('[ERRO]', erro);
			return message.channel.send(
				':confused: Algo de errado aconteceu, tente novamente mais tarde.'
			);
		}
	}
}
