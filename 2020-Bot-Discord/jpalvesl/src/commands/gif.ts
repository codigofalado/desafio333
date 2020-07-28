import { Message, Channel } from 'discord.js';
import axios from 'axios';

import { tenorKey } from '../../config.json';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'gif',
  args: true,
  usage: '<frase>',
  guildOnly: false,
	description: 'Retorna um gif',
	async execute(message: Message, args: Array<string>) {
    try {
      const { data } = await axios.get('https://api.tenor.com/v1/search', {
        params: {
          key: tenorKey,
          q: args.join(' '),
          locale: 'pt_BR',
          limit: 10,
          contentfilter: 'low'
        }
      })
      // console.log(data.results)
      const randomNumber = Math.floor(Math.random() * 10)

      return message.channel.send(`${data.results[randomNumber].url}\n\`Via Tenor\``)
    } catch (error) {
      console.log('Deu erro procurando gif')
    }
  },
};