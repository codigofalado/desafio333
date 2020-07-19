import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class CoinCommand extends Command {
	public constructor() {
		super('flip', {
			aliases: ['coin', 'flip'],
			description: {
				content: 'Cara ou coroa? Gire a moeda!',
				usage: 'flip',
				exemples: []
			},
			ratelimit: 3,
			channel: 'guild'
		});
	}

	public exec(message: Message): Promise<Message> {
		let flip = Math.floor(Math.random() * 3);
		var coin: string;

		if (flip != 1) {
			coin = `<@${message.author.id}> deu cara :face_with_hand_over_mouth:`;
		} else {
			coin = `<@${message.author.id}> deu coroa :crown:`;
		}

		return message.channel.send(coin);
	}
}
