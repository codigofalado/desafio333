import { Command, Argument } from 'discord-akairo';
import { Message } from 'discord.js';

export default class RaffleCommand extends Command {
	public constructor() {
		super('raffle', {
			aliases: ['raffle', 'sortear', 'giveaway'],
			category: 'utils',
			ratelimit: 3,
			channel: 'guild',
			args: [
				{
					id: 'number1',
					type: Argument.range('number', 1, Infinity),
					prompt: {
						start: ':one: Qual o primeiro número?',
						retry: ':warning: Número inválido, tente novamente.'
					}
				},
				{
					id: 'number2',
					type: Argument.range('number', 1, Infinity),
					prompt: {
						start: ':two: Qual o segundo número?',
						retry: ':warning: Número inválido, tente novamente.'
					}
				}
			]
		});
	}

	public exec(message: Message, { number1, number2 }) {
		try {
			if (number1 > number2) {
				var max = number1;
				var min = number2;
			} else {
				max = number2;
				min = number1;
			}
			let randomize = Math.floor(Math.random() * (max - min + 1) + min);
			return message.reply(
				`:tada: O resultado é ${randomize.toLocaleString('pt-BR')}`
			);
		} catch (erro) {
			console.log('[ERRO]');
			return message.channel.send(
				':confused: Algo de errado aconteceu, tente novamente mais tarde.'
			);
		}
	}
}
