import { Command } from 'discord-akairo';
import { Message, MessageEmbed, User } from 'discord.js';

export default class AvatarCommand extends Command {
	constructor() {
		super('avatar', {
			aliases: ['avatar'],
			category: 'utils',
			description: {
				content: 'Mostrar a foto de perfil de um usuário.',
				usage: 'avatar `<@usuário>`',
				exemples: ['avatar', 'avatar @BMO']
			},
			ratelimit: 3,
			channel: 'guild',
			args: [
				{
					id: 'user',
					type: 'user',
					default: (message: { author: any }) => message.author
				}
			]
		});
	}

	public exec(message: Message, { user }: { user: User }) {
		try {
			let avatarEmbed = new MessageEmbed()
				.setColor('00CEB3')
				.setTitle(`:frame_photo: ${user.username}`)
				.setDescription(
					`Clique **[aqui](${user.avatarURL({
						format: 'jpg',
						dynamic: true,
						size: 4096
					})})** para baixar a imagem.`
				)
				.setImage(
					user.displayAvatarURL({
						format: 'webp',
						dynamic: true,
						size: 2048
					})
				)
				.setFooter(`Avatar requisitado por ${message.author.username}`)
				.setTimestamp();

			return message.channel.send(avatarEmbed);
		} catch (erro) {
			console.log('[ERRO]', erro);
			return message.channel.send(
				':confused: Algo de errado aconteceu, tente novamente mais tarde.'
			);
		}
	}
}
