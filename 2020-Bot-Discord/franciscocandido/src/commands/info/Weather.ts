import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';

const HG_WEATHER_KEY = process.env.HG_WEATHER_KEY;

export default class WeatherCommand extends Command {
	public constructor() {
		super('clima', {
			aliases: ['clima', 'tempo'],
			category: 'info',
			description: {
				content: 'Mostrar o clima de uma região',
				usage: 'clima São Paulo',
				exemples: ['clima SP', 'clima Salvador']
			},
			cooldown: 10800,
			ratelimit: 2,
			channel: 'guild',
			args: [
				{
					id: 'city',
					type: 'string',
					match: 'content',
					prompt: {
						start: 'Qual a cidede que você deseja buscar?'
					}
				}
			]
		});
	}

	public async exec(message: Message, { city }: { city: string }) {
		await axios
			.get('https://api.hgbrasil.com/weather', {
				params: {
					key: HG_WEATHER_KEY,
					city_name: city,
					array_limit: 1
				}
			})
			.then((response) => {
				let weather = response.data;

				let weatherEmbed = new MessageEmbed()
					.setColor('00CEB3')
					.setTitle(`Clima em ${weather.results.city}`)
					.setDescription(`${weather.results.description}`)
					.addFields(
						{
							name: ':thermometer: Temperatura',
							value: `${weather.results.temp}Cº`,
							inline: true
						},
						{
							name: ':date: Data',
							value: `${weather.results.date}`,
							inline: true
						},
						{
							name: ':clock1: Hora',
							value: `${weather.results.time}`,
							inline: true
						},
						{
							name: ':droplet: Umidade',
							value: `${weather.results.humidity}%`,
							inline: true
						},
						{
							name: ':dash: Vento',
							value: `${weather.results.wind_speedy}`,
							inline: true
						},
						{
							name: ':sunrise: Nascer do Sol',
							value: `${weather.results.sunrise}`,
							inline: true
						},
						{
							name: ':city_sunset: Pôr do Sol',
							value: `${weather.results.sunset}`,
							inline: true
						}
					)
					.setFooter(`Comando executado por ${message.author.username}`)
					.setTimestamp();

				return message.channel.send(weatherEmbed);
			})
			.catch((erro) => {
				console.log('[ERRO]', erro);
				return message.channel.send(
					':confused: Algo de errado aconteceu, tente novamente mais tarde.'
				);
			});
	}
}
