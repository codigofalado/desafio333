import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class DiceCommand extends Command {
	public constructor() {
		super('dice', {
			aliases: ['dice', 'dado', 'roll'],
			category: 'fun',
			ratelimit: 3,
			channel: 'guild'
		});
	}

	public exec(message: Message) {
		try {
			const rollDice = Math.floor(Math.random() * 6) + 1;
			return message.channel.send(`:game_die: ${rollDice}`);
		} catch (erro) {
			console.log('[ERRO]', erro);
			return message.channel.send(
				':confused: Algo de errado aconteceu, tente novamente mais tarde.'
			);
		}
	}
}
