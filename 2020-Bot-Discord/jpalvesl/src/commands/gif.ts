import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando gif', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Comando que retorna um gif com base na frase que você envia e caso você não pesquise nada ele retorna um gif aleatório')
  .addFields([
    { name: 'Modo de usar', value: `\`${process.env.PREFIX}gif <busca>\` - Retorna um gif com base na frase pesquisada. Caso você não digite nenhuma frase será retornado um gif aleatório.` },
    { name: 'Parâmetros', value: `\`busca\` - Termo a ser pesquisado.` }
  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'gif',
  args: false,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Retorna a url de um gif.',
	async execute(message: Message, args: Array<string>) {
    try {
      let searchTerm;

      const { data: { results } } = await axios.get('https://api.tenor.com/v1/trending_terms', {
        params: {
          key: process.env.TENORKEY,
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
          key: process.env.TENORKEY,
          q: searchTerm,
          locale: 'pt_BR',
          limit: 1,
          contentfilter: 'off'
        }
      })

      
      return message.channel.send(`${data.results[0].url}\n\`Via Tenor\``)
    } catch (error) {
      console.log('Deu erro procurando gif')
      return message.reply(':x: Ocorreu um erro ao executar o comando, tente novamente')
    }
  },
};