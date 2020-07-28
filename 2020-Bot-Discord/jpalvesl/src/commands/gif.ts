import { Message } from 'discord.js';
import axios from 'axios';

import { tenorKey } from '../../config.json';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'gif',
  args: false,
  usage: '<frase>',
  guildOnly: false,
	description: 'Retorna um gif',
	async execute(message: Message, args: Array<string>) {
    try {
      let searchTerm;

      const { data: { results } } = await axios.get('https://api.tenor.com/v1/trending_terms', {
        params: {
          key: tenorKey,
          locale: 'pt_BR',
          limit: 20,
        }
      })

      if (args.length) {
        searchTerm = args.join(' ')
      } else {
        const randomPosition = Math.floor(Math.random() * 20)
        searchTerm = results[randomPosition]
      }


      const { data } = await axios.get('https://api.tenor.com/v1/random', {
        params: {
          key: tenorKey,
          q: searchTerm,
          locale: 'pt_BR',
          limit: 1,
          contentfilter: 'off'
        }
      })

      
      return message.channel.send(`${data.results[0].url}\n\`Via Tenor\``)
    } catch (error) {
      console.log('Deu erro procurando gif')
    }
  },
};