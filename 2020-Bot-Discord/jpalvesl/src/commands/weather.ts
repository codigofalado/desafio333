import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';

import { openWeatherKey } from '../../config.json';

function kelvinToCelsius(temp: number) {
  return (temp - 273).toFixed(2);
}

function hpaToAtm(pressure: number) {
  return (pressure/1013).toFixed(2)
}


const usage = new MessageEmbed()
  .setAuthor('Oizinho')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'weather',
  args: true,
  usage: usage,
  guildOnly: false,
	description: 'Lista os dados de clima de uma determinada cidade',
	async execute(message: Message, args: Array<string>) {
    let data;
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: args.join(' '),
          appid: openWeatherKey
        }
      })
      data = response.data
      //console.log(data)
    } catch (error) {
      return console.log('Não foi possivel encontrar a cidade')
    }

    const weatherEmbed = new MessageEmbed()
      .setColor('#f7f7f7')
      .setAuthor('Kurisu', 'https://cdn.discordapp.com/avatars/724090193153622096/a02d4db5a8f5d962f2d0c1cb53bbbb1c.png')
      .setTitle(`Informações sobre o clima de ${data.name} - ${data.sys.country}`)
      .setThumbnail(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
      .addFields([
        { name: ':small_orange_diamond: Temperatura', value: `**Atual**: ${kelvinToCelsius(data.main.temp)} °C\n**Sensação térmica**: ${kelvinToCelsius(data.main.feels_like)} °C\n**Mínima**: ${kelvinToCelsius(data.main.temp_min)} °C\n**Máxima**: ${kelvinToCelsius(data.main.temp_max)}`, inline: true },
        { name: ':small_orange_diamond: Vento', value: `**Velocidade**: ${data.wind.speed.toFixed(2)}m/s\n**Direção**: ${data.wind.deg}°`, inline: true },
        { name: ':small_orange_diamond: Mais', value: `**Pressão**: ${hpaToAtm(data.main.pressure)}atm\n**Úmidade**: ${data.main.humidity}%\n**Nebulosidade**: ${data.clouds.all}%` },
      ])
      .setTimestamp()
      .setFooter('Feito com a api do openweather')

		return message.channel.send(weatherEmbed);
	},
};