import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

export default class RandomGifCommand extends Command {
	public constructor() {
		super('gif', {
			aliases: ['gif'],
			category: 'gif',
			description: {
				content: 'Mostrar um GIF completamente aleatório do Giphy.',
				usage: 'gif',
				exemples: 'gif'
			},
			ratelimit: 3,
			channel: 'guild'
		});
	}

	public async exec(message: Message) {
		try {
			let gif = await axios.get(`https://api.giphy.com/v1/gifs/random`, {
				params: {
					api_key: GIPHY_API_KEY,
					rating: 'g'
				}
			});

			let randomGif = gif.data.data.images.original.url;

			return message.channel.send(
				new MessageEmbed()
					.setColor('00CEB3')
					.setImage(randomGif)
					.setFooter(`GIF Requisitado por ${message.author.username}`)
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
