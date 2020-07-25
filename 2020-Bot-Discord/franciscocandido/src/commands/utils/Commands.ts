import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class CommandsCommand extends Command {
	public constructor() {
		super('commands', {
			aliases: ['commands', 'comandos'],
			ratelimit: 3,
			channel: 'guild'
		});
	}

	public exec(message: Message) {
		return message.channel.send(
			`<@${message.author.id}> Você pode encontrar meus comandos aqui: https://bit.ly/3fYPwgb`
		);
	}
}
