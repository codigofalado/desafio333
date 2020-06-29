import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import twitter from '../../client/configs/TwitterLite';

export default class LastTweet extends Command {
	public constructor() {
		super('lastTweet', {
			aliases: ['lastTweet', 'tweet'],
			category: 'twitter',
			ratelimit: 3,
			channel: 'guild',
			args: [
				{
					id: 'user',
					type: 'string',
					match: 'content',
					prompt: {
						start:
							':busts_in_silhouette: Qual o `@` do usuário que você deseja buscar? Ex:`@CodigoFalado`',
						retry: 'Usuário inválido, tente novamente.'
					}
				}
			]
		});
	}

	public async exec(message: Message, { user }) {
		try {
			let tweetData = await twitter.get('statuses/user_timeline', {
				screen_name: user,
				count: 1,
				tweet_mode: 'extended'
			});

			let tweetText = tweetData.map(
				(tweet: { full_text: string }) => `${tweet.full_text}`
			);

			let tweetEmbed = new MessageEmbed()
				.setColor('00CEB3')
				.setTitle(`:bird: Ultima atividade de ${user}`)
				.setDescription(tweetText)
				.setDescription(`Comando executado por ${message.author.username}`)
				.setTimestamp();

			return message.channel.send(tweetEmbed);
		} catch (erro) {
			console.log('[ERRO]', erro);
			if ('errors' in erro) {
				if (erro.errors[0].code == 34) {
					return message.channel.send(':broken_heart: Usuário não encontrado.');
				} else {
					return message.channel.send(
						':confused: Algo de errado aconteceu, tente novamente mais tarde.'
					);
				}
			}
		}
	}
}
