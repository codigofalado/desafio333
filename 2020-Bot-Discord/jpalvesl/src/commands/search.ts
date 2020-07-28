import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';

import { prefix } from '../../config.json';
import { newsApiKey } from '../../config.json';

interface Article {
  title: string;
  description: string;
  url: string;
}

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando search', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Pesquisa noticias.')
  .addFields([
    { name: 'Modo de usar', value: `\`${prefix}search <frase>\` - Retorna no máximo 6 noticias. Caso a frase não seja informada, serão retornadas as princiapais manchetes` },
    { name: 'Parâmetros', value: '`frase` - Termo a ser pesquisado.' }
  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'search',
  args: false,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Pesquisa noticias específicas caso você pesquise, e caso você não pesquise nada, mostra as principais noticias.',
	async execute(message: Message, args: Array<string>) {
    let data;
    const searchTerm = args.join(' ')

    try {
      if (!args.length) {
        const { data: headlines } = await axios.get('https://newsapi.org/v2/top-headlines', {
          params : {
            country: 'br',
            apiKey: newsApiKey
          }
        })
        data = headlines
      }
      else {
        const { data: everything } = await axios.get('https://newsapi.org/v2/everything', {
          params : {
            q: searchTerm,
            language: 'pt',
            apiKey: newsApiKey
          }
        })
        data = everything
      }
    } catch (error) {
      return console.log('Deu erro aqui', error)
    }

    let lastItem = 6
    if (lastItem < data.length) lastItem = data.length

    const searchEmbed = new MessageEmbed()
      .setColor('#ffffff')
      .setAuthor('Kurisu', 'https://cdn.discordapp.com/avatars/724090193153622096/a02d4db5a8f5d962f2d0c1cb53bbbb1c.png')
      .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/733112402911952967/news-icon-12.png')
      .addFields(data.articles.splice(0, lastItem).map((article: Article) => {
        
        return {
          name: article.title,
          value: `${article.description.slice(0, 50)}...\n[Ver notícia completa](${encodeURI(article.url)})`,
          inline: true,
        }
      }))
      .setFooter('Feito com NewsApi')
      .setTimestamp()
      
		message.channel.send(searchEmbed);
	},
};