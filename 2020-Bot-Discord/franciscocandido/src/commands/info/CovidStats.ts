import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import moment from 'moment';
import axios from 'axios';

const API_URL = 'https://covid19-brazil-api.now.sh/api/report/v1/brazil';

export default class CovidCommand extends Command {
	public constructor() {
		super('covid', {
			aliases: ['covid', 'covid19', 'casos', 'coronavirus'],
			category: 'info',
			description: {
				content: 'Mostrar informações do coronavírus no Brasil.',
				usage: 'covid',
				exemples: ['covid']
			},
			ratelimit: 3,
			channel: 'guild'
		});
	}

	public async exec(message: Message) {
		try {
			let getData = async () => {
				let response = await axios.get(API_URL);
				let data = response.data;
				return data;
			};
			let cases = await getData();

			var casesEmbed = new MessageEmbed()
				.setColor('00CEB3')
				.setTitle(':flag_br: COVID-19 no Brasil')
				.addFields(
					{
						name: ':chart_with_upwards_trend: Total',
						value: `${cases.data.confirmed.toLocaleString('pt-BR')}`,
						inline: true
					},
					{
						name: ':pill: Ativos',
						value: `${cases.data.cases.toLocaleString('pt-BR')}`,
						inline: true
					},
					{
						name: ':cross: Mortes',
						value: `${cases.data.deaths.toLocaleString('pt-BR')}`,
						inline: true
					},
					{
						name: ':heart: Recuperados',
						value: `${cases.data.recovered.toLocaleString('pt-BR')}`,
						inline: true
					},
					{
						name: ':arrows_counterclockwise: Atualizado em',
						value: `${moment(cases.data.updated_at).format(
							'DD/MM/YYYY - hh:mmA'
						)}`,
						inline: true
					}
				)
				.setFooter(`Dados requisitados por ${message.author.username}`)
				.setTimestamp();

			return message.channel.send(casesEmbed);
		} catch (erro) {
			console.log('[ERRO]', erro);
			return message.channel.send(
				':confused: Algo de errado aconteceu, tente novamente mais tarde.'
			);
		}
	}
}
