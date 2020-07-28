import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';
import { prefix } from '../../config.json';

interface Country {
  CountryCode: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando corona', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .addFields([
    { name: 'Modo de usar', value: `\`${prefix}corona\` - Mostra informações relacionadas ao COVID-19.` },
  ])
  .setDescription(':ambulance: Comando que lista informações sobre o corona virus no Brasil e no mundo. São exibidos as seguintes informações: `Confirmados`, `Doentes`, `Mortos` e `Recuperados`')
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'corona',
  args: false,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Mostra informações relacionadas ao COVID-19.',
	async execute(message: Message, args: Array<string>) {
    const { data } = await axios.get('https://api.covid19api.com/summary')
    const [brazil] = data.Countries.filter((country : Country) => country.CountryCode === 'BR')
    
    const totalConfirmed = data.Global.TotalConfirmed
    const totalDeaths = data.Global.TotalDeaths
    const totalRecovered = data.Global.TotalRecovered
    const totalActive = totalConfirmed - totalRecovered
    
    const brazilConfirmed = brazil.TotalConfirmed
    const brazilDeaths = brazil.TotalDeaths
    const brazilRecovered = brazil.TotalRecovered
    const brazilActive = brazilConfirmed - brazilRecovered


    const coronaEmbed = new MessageEmbed()
      .setColor('#ff0000')
      .setAuthor('Kurisu', 'https://cdn.discordapp.com/avatars/724090193153622096/a02d4db5a8f5d962f2d0c1cb53bbbb1c.png')
      .setTitle('Casos de COVID-19')
      .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/732787369303867453/unknown.png')
      .addFields([
        { name: 'Casos ao redor do Mundo', value: `:white_check_mark: **Confirmados**: ${totalConfirmed}\n:ambulance: **Doentes**: ${totalActive} \n:skull: **Mortes**: ${totalDeaths}\n:recycle: **Recuperados**: ${totalRecovered}` },
        { name: '\u200B', value: '\u200B' },
        { name: 'Casos no Brasil', value: `:white_check_mark: **Confirmados**: ${brazilConfirmed}\n:ambulance: **Doentes**: ${brazilActive} \n:skull: **Mortes**: ${brazilDeaths}\n:recycle: **Recuperados**: ${brazilRecovered}` },
      ])
      .setTimestamp()
      .setFooter('Feito com a COVID19 api')
    message.channel.send(coronaEmbed);
  },
};