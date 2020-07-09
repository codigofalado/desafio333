import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';

export default class Exchange extends Command {
	public constructor() {
		super('cambio', {
			aliases: ['cambio', 'exchange', 'moeda'],
			category: 'economy',
			description: {
				content: 'Cotação das principais moedas do mundo.',
				usage: 'cambio <moeda>',
				exemples: ['cambio USD', 'cambio JPY']
			},
			ratelimit: 3,
			channel: 'guild',
			args: [
				{
					id: 'coin',
					type: 'string',
					match: 'content',
					default: 'USD'
				}
			]
		});
	}

	public async exec(message: Message, { coin }) {
		try {
			let coinUpper = coin.toUpperCase();

			let atualExchange = await axios({
				method: 'GET',
				url: `https://economia.awesomeapi.com.br/all/${coinUpper}-BRL`,
				validateStatus: () => true
			});

			let notCoinMessage =
				':warning: Não encontrei essa moeda. Utilize o comando `help` para ver a lista de comandos\nAs moedas disponíveis são `USD, USDT, CAD, AUD, EUR, GBP, ARS, JPY, CHF, CNY, YLS, BTC, LTC, ETH, XRP`';

			if (atualExchange.status == 404) {
				return message.channel.send(notCoinMessage);
			} else if (coinUpper == 'USDT') {
				return message.channel.send(
					'Estamos com problema para os dados dessa moeda, tente novamente mais tarde.'
				);
			}

			let exchange = atualExchange.data[`${coinUpper}`];

			function formatCoin(number: any, coinCode: string) {
				let formatedCoin = new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: `${coinCode}`
				}).format(number);

				return formatedCoin;
			}

			let exchangeEmbed = new MessageEmbed()
				.setColor('00CEB3')
				.setTitle(`Preço do ${exchange.name} em Reais`)
				.setDescription(
					`${formatCoin(1, `${coinUpper}`)} está custando ${formatCoin(
						exchange.bid,
						'BRL'
					)}`
				)
				.addFields(
					{ name: ':dollar: Moeda', value: `${coinUpper}`, inline: true },
					{
						name: ':bar_chart: Preço',
						value: `${formatCoin(exchange.bid, 'BRL')}`,
						inline: true
					},
					{
						name: ':shopping_cart: Valor de compra',
						value: `${formatCoin(exchange.bid, 'BRL')}`,
						inline: true
					},
					{
						name: ':moneybag: Valor de venda',
						value: `${formatCoin(exchange.ask, 'BRL')}`,
						inline: true
					},
					{
						name: ':chart_with_upwards_trend: Máximo',
						value: `${formatCoin(exchange.high, 'BRL')}`,
						inline: true
					},
					{
						name: ':chart_with_downwards_trend: Mínimo',
						value: `${formatCoin(exchange.low, 'BRL')}`,
						inline: true
					}
				)
				.setFooter(`Comando executado por ${message.author.username}`)
				.setTimestamp();

			return message.channel.send(exchangeEmbed);
		} catch (erro) {
			console.log('[ERRO]', erro);
			if (erro.data.status == 404) {
				console.log('oi');
			} else {
				return message.channel.send(
					':confused: Algo de errado aconteceu, tente novamente mais tarde.'
				);
			}
		}
	}
}
