import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
	public constructor() {
		super('ping', {
			aliases: ['ping', 'latencia', 'p'],
			category: 'utils',
			description: {
				content: 'Mostrar latência do cliente e do servidor.',
				usage: 'ping',
				exemples: 'ping'
			},
			ratelimit: 3,
			channel: 'guild'
		});
	}

	public async exec(message: Message) {
		try {
			let testMessage: any = await message.channel.send(
				':hourglass_flowing_sand: Aguarde...'
			);

			const latency =
				(testMessage.editedAt || testMessage.createdAt) -
				(testMessage.editedAt || message.createdAt);

			return testMessage.edit(
				`:ping_pong: **|** <@${
					message.author.id
				}> **Pong!**\n:repeat_one: **| RTT: \`${latency}ms\`**\n:heart_decoration: **| Heartbeat**: \`${Math.round(
					this.client.ws.ping
				)}ms\``
			);
		} catch (erro) {
			console.log('[ERRO]', erro);
			return message.channel.send(
				':confused: Algo de errado aconteceu, tente novamente mais tarde.'
			);
		}
	}
}
