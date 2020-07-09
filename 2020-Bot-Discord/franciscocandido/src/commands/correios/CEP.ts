import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import CepPromise from 'cep-promise';

export default class CEP extends Command {
	public constructor() {
		super('cep', {
			aliases: ['cep', 'buscarCep'],
			category: 'correios',
			description: {
				content: 'Busque informações de um CEP',
				usage: 'cep <CEP>',
				exemples: ['cep 04180-112', 'buscarCep 27521-490', 'cep']
			},
			ratelimit: 3,
			channel: 'guild',
			args: [
				{
					id: 'cep',
					type: 'string',
					match: 'content',
					prompt: {
						start: 'Qual CEP você deseja buscar?'
					}
				}
			]
		});
	}

	public async exec(message: Message, { cep }: { cep: string }) {
		try {
			let noSignCep: string = cep.replace(/\D/g, '');

			if (noSignCep.length != 8) {
				return message.channel.send(
					`<@${message.author.id}> um CEP deve conter 8 números.\nVocê digitou um com ${noSignCep.length}. Tente novamente.`
				);
			}

			CepPromise(noSignCep)
				.then((response) => {
					if (!response.neighborhood) {
						response.neighborhood = 'Indisponível';
					}

					if (!response.street) {
						response.street = 'Indisponível';
					}

					let cepFormated: string = response.cep
						.replace(/(\d{5})(\d)/, '$1-$2')
						.replace(/(-\d{3})\d+?$/, '$1');

					let cepEmbed = new MessageEmbed()
						.setTitle(`Você buscou por ${cepFormated}`)
						.addFields(
							{ name: ':mailbox: CEP', value: `${cepFormated}`, inline: true },
							{
								name: ':map: Estado',
								value: `${response.state}`,
								inline: true
							},
							{
								name: ':cityscape: Cidade',
								value: `${response.city}`,
								inline: true
							},
							{
								name: ':city_sunset: Região',
								value: `${response.neighborhood}`,
								inline: true
							},
							{
								name: ':motorway: Rua',
								value: `${response.street}`,
								inline: true
							}
						);

					return message.channel.send(cepEmbed);
				})
				.catch((erro) => {
					console.log('[ERRO]', erro);
					return message.channel.send('CEP não encontrado, tente novamente.');
				});
		} catch (erro) {
			console.log('[ERRO]', erro);
			return message.channel.send(
				':confused: Algo de errado aconteceu, tente novamente mais tarde.'
			);
		}
	}
}
