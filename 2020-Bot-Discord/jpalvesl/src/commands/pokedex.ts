import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';

import { prefix } from '../../config.json';

interface PokemonInApi {
  id: number;
  height: number;
  weight: number;
  name: string;
  types: Array<{
    type: {
      name: string;
    }
  }>;
}

interface Pokemon {
  id: number;
  height: number;
  weight: number;
  name: string;
  types: [string];
  imageURL: string;
}

function capitalizeWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
 
}

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando pokedex', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Sua pokedéx, que mostra informações sobre o pokemon procurado')
  .addFields([
    { name: 'Modo de usar', value: `\`${prefix}pokedex <busca>\`` },
    { name: 'Parâmetros', value: `\`busca\` - O nome do pokemon ou seu número na pokedex.` }

  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'pokedex',
  args: true,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Retorna uma mesangem com todos os comandos presentes no bot e também caso você passe o nome do comando como parâmetro ele lista informações sobrbe o comando específico.',
	async execute(message: Message, args: Array<string>) {
    let pokemon;

    try {
      let data
      const response = await  axios.get(`https://pokeapi.co/api/v2/pokemon/${args[0]}`)
      data = response.data as PokemonInApi;
      
      const types = data.types.map(({ type }) => {
        return type.name[0].toUpperCase() + type.name.slice(1).toLowerCase()
      })

      pokemon = {
        id: data.id,
        height: data.height/10,
        weight: data.weight/10,
        name: data.name,
        imageURL: `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`,
        types
      } as Pokemon
    } catch (error) {
      return console.log('Erro ao buscar pokemon')
    }

    const pokemonEmbed = new MessageEmbed()
      .setAuthor('Pokedex', 'https://icon-library.com/images/pokedex-icon/pokedex-icon-21.jpg')
      .setDescription('Esta é sua pokedex, e essas são as informações sobre o pokemon procurado')
      .setColor('#ffffff')
      .setImage(pokemon.imageURL)
      .addField(capitalizeWord(pokemon.name), `**Altura**: ${pokemon.height}m\n**Peso**: ${pokemon.weight}kg\n**Tipos**: ${pokemon.types.join(', ')}`)

    return message.channel.send(pokemonEmbed)
	},
};