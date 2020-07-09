import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class EightBallCommand extends Command {
	public constructor() {
		super('bolaOito', {
			aliases: ['bolaOito', 'eightBall', 'bola8'],
			category: 'fun',
			description: {
				content: 'Faça uma pergunta de sim ou não.',
				usage: 'bola8 <Pergunta>',
				exemples: ['bola8 Sim ou Não?']
			},
			ratelimit: 3,
			channel: 'guild'
		});
	}

	public exec(message: Message) {
		try {
			let possibleResponses = [
				'É certo.',
				'É decididamente que sim.',
				'Sem dúvida.',
				'Sim, definitivamente.',
				'Você pode contar com isso.',
				'A meu ver, sim.',
				'Provavelmente.',
				'Prevejo que sim.',
				'Sim.',
				'Sinais apontam que sim.',
				'Resposta incerta, tente novamente.',
				'Pergunte novamente mais tarde.',
				'Melhor não te dizer agora.',
				'Não é possível prever agora.',
				'Concentre-se e pergunte novamente.',
				'Não conte com isso.',
				'Minha resposta é não.',
				'Minhas fontes dizem não.',
				'Prevejo que não.',
				'Definitivamente não.'
			];

			let randomResponse = Math.floor(Math.random() * possibleResponses.length);

			return message.channel.send(
				`:8ball: <@${message.author.id}> ${possibleResponses[randomResponse]}`
			);
		} catch (erro) {
			console.log('[ERRO]', erro);
			return message.channel.send(
				':confused: Algo de errado aconteceu, tente novamente mais tarde.'
			);
		}
	}
}
