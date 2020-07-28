import { Message } from 'discord.js';
import axios from 'axios';

import { googleNewsKey } from '../../config.json';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'search',
  args: false,
  usage: '<termos de pesquisa>',
  guildOnly: false,
	description: 'Pesquisa ',
	async execute(message: Message, args: Array<string>) {
    const searchTerm = args.join(' ')

    try {
      if (!args.length) {
        const { data } = await axios.get('https://newsapi.org/v2/everything', {
          params: {
          q: '???',
          language: 'pt',
          apiKey: googleNewsKey
          }
        })
        return console.log(data)
      }
      else {
        const { data } = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            q: searchTerm,
            country: 'br',
            apiKey: googleNewsKey
          }
        })
        return console.log(data)
      }
    } catch (error) {
      return console.log('Deu erro ao fazer a pesquisa')
    }

		message.channel.send(':robot: Boop.');
	},
};