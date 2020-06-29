import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

export default class SearchGIF extends Command {
	public constructor() {
		super('searchGif', {
			aliases: ['searchGif', 'buscarGif', 'Sg'],
			category: 'gif',
			ratelimit: 3,
			channel: 'guild',
			args: [
				{
					id: 'search',
					type: 'string',
					match: 'content',
					prompt: {
						start: ':mag: O que você deseja buscar?',
						retry: ':warning: Pesquisa inválida'
					}
				}
			]
		});
	}

	public async exec(message: Message, { search }) {
		try {
			let gif = await axios.get(
				`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${search}&limit=1&rating=g`
			);
			let gifObject = gif.data.data[0];
			let gifURL = gifObject.images.original.url;

			return message.channel.send(
				new MessageEmbed()
					.setColor('00CEB3')
					.setImage(gifURL)
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
