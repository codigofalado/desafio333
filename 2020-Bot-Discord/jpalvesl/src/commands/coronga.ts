import { Message } from 'discord.js';
import axios from 'axios';

interface Country {
  CountryCode: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'coronga',
  args: false,
  usage: '',
  guildOnly: true,
	description: 'Get the data from corona in Brazil and all other countries!',
	async execute(message: Message, args: Array<string>) {
    const { data } = await axios.get('https://api.covid19api.com/summary')
    const [brazil] = data.Countries.filter((country : Country) => country.CountryCode === 'BR')
    
    const totalConfirmed = data.Global.TotalConfirmed
    const totalDeaths = data.Global.TotalDeaths
    
    const brazilConfirmed = brazil.TotalConfirmed
    const brazilDeaths = brazil.TotalDeaths

    message.channel.send(`Mundo\nTotal de casos: ${totalConfirmed}\nTotal de mortos: ${totalDeaths}\nTotal de recuperados: ${data.Global.TotalRecovered}\n\nBrasil\nTotal de casos: ${brazilConfirmed}\nTotal de mortes: ${brazilDeaths}\nTotal de recuperados: ${brazil.TotalRecovered}\n`);
  },
};