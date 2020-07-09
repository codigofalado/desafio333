import { Command, Argument } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import twitter from '../../client/configs/TwitterLite';

export default class TrendsCommand extends Command {
	public constructor() {
		super('trends', {
			aliases: ['trends'],
			category: 'twitter',
			description: {
				content: 'Mostrar os assuntos em alta no Twitter Brasil.',
				usage: 'trends 20',
				exemples: ['trends 10', 'trends 25']
			},
			ratelimit: 1,
			channel: 'guild',
			cooldown: 2e4,
			args: [
				{
					id: 'count',
					type: Argument.range('number', 1, 26),
					match: 'content',
					prompt: {
						start:
							':clipboard: Qual a quantidade de tópicos deseja ver? `1 a 25`',
						retry:
							':warning: Talvez você tenha passado do limite `25`. Tente novamente.'
					}
				}
			]
		});
	}

	public async exec(message: Message, { count }) {
		try {
			let tweetData = await twitter.get('trends/place', {
				id: 23424768
			});

			let realCount = count == 1 ? (count = 0) : count - 1;

			let trendsEmbed = new MessageEmbed()
				.setColor('00CEB3')
				.setTitle('Twitter :flag_br:')
				.setDescription(`Principais assuntos do Twitter Brasil nesse momento`)
				.setFooter(`Comando executado por ${message.author.username}`)
				.setTimestamp();

			let trends = tweetData[0].trends;
			let forSize: number;

			for (forSize = 0; forSize <= realCount; forSize++) {
				let position: number;
				if (forSize == 0) {
					position = 1;
				} else {
					position = forSize + 1;
				}

				trendsEmbed.addFields({
					name: `${position}º`,
					value: `${trends[forSize].name}`
				});
			}

			return message.channel.send(trendsEmbed);
		} catch (erro) {
			console.log('[ERRO]', erro);
			return message.channel.send(
				':confused: Algo de errado aconteceu, tente novamente mais tarde.'
			);
		}
	}
}
