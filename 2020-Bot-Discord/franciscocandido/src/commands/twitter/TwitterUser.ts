import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import moment from 'moment';
import twitter from '../../client/configs/TwitterLite';

export default class TwitterUserCommand extends Command {
	public constructor() {
		super('twitterUser', {
			aliases: ['twitterUser'],
			category: 'twitter',
			description: {
				content: 'Mostar informações de usuário do Twitter.',
				usage: 'twitterUser `<@usuário>`',
				exemples: ['twitterUser @CodigoFalado']
			},
			ratelimit: 1,
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
			let tweetData = await twitter.get('users/show', {
				screen_name: user
			});

			let name = tweetData.name;
			let screenName = tweetData.screen_name;
			let location = tweetData.location;
			let description = tweetData.description;
			let followers = tweetData.followers_count;
			let following = tweetData.friends_count;
			let createdAt = tweetData.created_at;
			let profilePic = tweetData.profile_image_url_https;

			let dateToString = moment(createdAt, 'DD/MM/YYYY - hh:mmA');

			let userEmbed = new MessageEmbed()
				.setColor('00CEB3')
				.setTitle(screenName)
				.setDescription(description)
				.setThumbnail(profilePic)
				.addFields(
					{ name: ':id: Nome', value: `${name}`, inline: true },
					{
						name: ':bust_in_silhouette: Username',
						value: `${screenName}`,
						inline: true
					},
					{
						name: ':round_pushpin: Localização',
						value: `${location}`,
						inline: true
					},
					{
						name: ':busts_in_silhouette: Seguidores',
						value: `${followers}`,
						inline: true
					},
					{ name: ':iphone: Seguindo', value: `${following}`, inline: true },
					{
						name: ':calendar_spiral: Criada em',
						value: `${dateToString}`,
						inline: true
					}
				)
				.setFooter(`Comando requisitado por ${message.author.username}`)
				.setTimestamp();

			return message.channel.send(userEmbed);
		} catch (erro) {
			console.log('[ERRO]', erro);
			if ('errors' in erro) {
				if (erro.errors[0].code == 34) {
					return message.channel.send(':warning: Usuário não encontrado.');
				} else {
					return message.channel.send(
						':confused: Algo de errado aconteceu, tente novamente mais tarde.'
					);
				}
			}
		}
	}
}
