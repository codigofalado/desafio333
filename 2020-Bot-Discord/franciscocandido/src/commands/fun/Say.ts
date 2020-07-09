import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class SayCommand extends Command {
	public constructor() {
		super('fale', {
			aliases: ['fale', 'say', 'falar'],
			category: 'fun',
			description: {
				content: 'Faça o BMO falar algo.',
				usage: 'fale oi',
				exemples: ['fale oi', 'say Olá']
			},
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
