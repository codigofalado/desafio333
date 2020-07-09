import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class oi extends Command {
	public constructor() {
		super('oi', {
			aliases: ['oi'],
			category: 'Sem Categoria',
			description: {
				content: 'Faça o bot falar "oi".',
				usage: 'oi',
				exemples: ['oi']
			}
		});
	}

	public exec(message: Message) {
		return message.channel.send('oi');
	}
}
