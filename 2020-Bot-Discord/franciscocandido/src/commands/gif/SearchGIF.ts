import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

export default class SearchGIFCommand extends Command {
	public constructor() {
		super('BuscarGif', {
			aliases: ['buscarGif'],
			category: 'gif',
			description: {
				content: 'Buscar um GIF do Giphy',
				usage: 'BuscarGif <busca>',
				exemples: ['BuscarGif code', 'BuscarGif car', 'BuscarGif bot']
			},
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
			let gif = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
				params: {
					api_key: GIPHY_API_KEY,
					q: search,
					rating: 'g'
				}
			});
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
