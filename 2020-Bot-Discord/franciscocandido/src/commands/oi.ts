import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class oi extends Command {
	public constructor() {
		super('oi', {
			aliases: ['oi']
		});
	}

	public exec(message: Message) {
		return message.channel.send('oi');
	}
}
