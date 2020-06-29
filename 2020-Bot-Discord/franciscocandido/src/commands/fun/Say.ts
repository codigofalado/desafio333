import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class SayCommand extends Command {
	public constructor() {
		super('say', {
			aliases: ['say', 'falar'],
			category: 'fun',
			ratelimit: 3,
			channel: 'guild',
			args: [
				{
					id: 'speech',
					type: 'string',
					match: 'content'
				}
			]
		});
	}

	public async exec(message: Message, { speech }) {
		try {
			await message.channel.send(speech);
			message.delete();
		} catch (erro) {
			console.log('[ERRO]', erro);
			return message.channel.send(
				':confused: Algo de errado aconteceu, tente novamente mais tarde.'
			);
		}
	}
}
