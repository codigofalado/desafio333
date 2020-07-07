import { Listener, Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Cooldown extends Listener {
	public constructor() {
		super('cooldown', {
			emitter: 'commandHandler',
			event: 'cooldown',
			category: 'commands'
		});
	}

	public exec(message: Message, command: Command, remaining: number) {
		let cooldownMessage = `:fire: <@${
			message.author.id
		}> você precisa esperar \`${Math.ceil(
			remaining / 1000
		)}s\` para utilizar o comando \`${command}\` novamente.`;

		return message.channel.send(cooldownMessage);
	}
}
