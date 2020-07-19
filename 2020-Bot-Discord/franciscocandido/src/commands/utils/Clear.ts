import { Command, Argument } from 'discord-akairo';
import { Message } from 'discord.js';

export default class ClearCommand extends Command {
	public constructor() {
		super('clear', {
			aliases: ['clear', 'limpar'],
			description: {
				content: 'Limpe o chat',
				usage: 'clear <número>',
				exemples: ['clear 100', 'clear 2', 'clear']
			},
			ratelimit: 3,
			channel: 'guild',
			userPermissions: ['MANAGE_MESSAGES'],
			args: [
				{
					id: 'amount',
					type: Argument.range('number', 2, 101),
					match: 'content',
					prompt: {
						start: 'Quantas mensagens deseja apagar? `2 a 100`',
						retry: 'Só posso deletar de 2 a 100 mensagens. Tente novamente.'
					}
				}
			]
		});
	}

	public exec(message: Message, { amount }: { amount: number }) {
		try {
			message.channel.bulkDelete(amount, true);

			return message.channel.send(
				`<@${message.author.id}> Deletei \`${amount}\` mensagens`
			);
		} catch (erro) {
			console.log('[ERRO]');
			return message.channel.send(
				':confused: Algo de errado aconteceu, tente novamente mais tarde.'
			);
		}
	}
}
