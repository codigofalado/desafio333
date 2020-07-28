import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';

interface PokemonInApi {
  id: number;
  base_experience: number;
  height: number;
  weight: number;
  name: string;
  species: {
    url: string;
  }
  types: Array<{
    type: {
      name: string;
    }
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    }
  }>;
}

interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  generation: {
    name: string;
  }
  growth_rate: {
    name: string;
  }
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    }
  }>;
}

interface Pokemon {
  id: number;
  height: number;
  weight: number;
  name: string;
  base_experience: number;
  base_happiness: number,
  capture_rate: number;
  growth_rate: string;
  generation: string;
  flavor_text: string;
  types: [string];
  imageURL: string;
  stats: Array<{
    name: string;
    base_stat: number;
    effort: number;
  }>;
  abilities: Array<{
    name: string;
    short_effect: string;
  }>;
}

function capitalizeWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

function formatGeneration (generation: string) {
  const arrayToFormat = generation.split('-')

  return `${capitalizeWord(arrayToFormat[0])} ${arrayToFormat[1].toUpperCase()}`
}

function formatEffort(stats: Array<any>) {
  const effortTrue = stats.map(stat => {
    const typeStat = capitalizeWord(stat.name.split('-').join(' '))

    if (stat.effort) {
      return `${stat.effort} ${typeStat}`
    }
  }).filter(stat => stat)

  return effortTrue.join('\n')
}

function formatGrowth(growth_rate: string) {
  return capitalizeWord(growth_rate.split('-').join(' '))
}

function formatStats(stats: Array<any>) {
  const formatedStats = stats.map(stat => {
    return `**${capitalizeWord(stat.name.split('-').join(' '))}**: ${stat.base_stat}`
  })

  return formatedStats.join('\n')
}

function formatAbilities(abilities: Array<any>) {
  const formatedAbilities = abilities.map(ability => {
    return `**${capitalizeWord(ability.name.split('-').join(' '))}**: ${ability.short_effect}`
  })

  return formatedAbilities.join('\n')
}

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando pokedex', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Sua pokedéx, que mostra informações sobre o pokemon procurado')
  .addFields([
    { name: 'Modo de usar', value: `\`${process.env.PREFIX}pokedex <busca>\`` },
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
      const response = await  axios.get(`https://pokeapi.co/api/v2/pokemon/${args[0]}`)
      const data = response.data as PokemonInApi;
      
      const types = data.types.map(({ type }) => {
        return type.name[0].toUpperCase() + type.name.slice(1).toLowerCase()
      })

      const stats = data.stats.map(({ base_stat, effort, stat }) => {
        return {
          base_stat,
          effort,
          name: stat.name
        }
      })

      const speciesResponse = await axios.get(data.species.url)
      const speciesData = speciesResponse.data as PokemonSpecies

      const flavor_text = speciesData.flavor_text_entries.find(entrie => entrie.language.name === 'en')?.flavor_text

      let abilities = new Array<any>()

      for (const object of data.abilities) {
        const { data } = await axios.get(object.ability.url)
        
        const shortEffect = data.effect_entries.find(entrie => entrie.language.name === 'en')?.short_effect

        const objectArray = {
          name: object.ability.name,
          short_effect: shortEffect
        }
        abilities.push(objectArray)
      }

      pokemon = {
        id: data.id,
        height: data.height/10,
        weight: data.weight/10,
        name: data.name,
        base_experience: data.base_experience,
        base_happiness: speciesData.base_happiness,
        capture_rate: speciesData.capture_rate,
        growth_rate: speciesData.growth_rate.name,
        generation: speciesData.generation.name,
        flavor_text,
        imageURL: `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`, // data.sprites.front_default
        types,
        stats,
        abilities
      } as Pokemon
    } catch (error) {
      console.log('Erro ao buscar pokemon')
      return message.reply(':x: Houve um erro ao executar esse comando tente novamente')
    }

    // return console.log(pokemon.stats)
    const pokemonEmbed = new MessageEmbed()
      .setAuthor(capitalizeWord(pokemon.name), 'https://icon-library.com/images/pokedex-icon/pokedex-icon-21.jpg')
      .setDescription(pokemon.flavor_text)
      .setColor('#ffffff')
      .setThumbnail(pokemon.imageURL)
      .addFields(
        { name: 'Tipo', value: `${pokemon.types.join(', ')}`, inline: true },
        { name: 'Número na pokedéx', value: `${pokemon.id}`, inline: true },
        { name: 'Geração', value: `${formatGeneration(pokemon.generation)}`, inline: true },
        { name: 'Habilidades', value: `${formatAbilities(pokemon.abilities)}`, inline: false },
        { name: 'Treinamentos base', value: `**EXP**: ${pokemon.base_experience}\n**Pontos de esforço**: ${formatEffort(pokemon.stats)}\n**Taxa de captura**: ${pokemon.capture_rate}\n**Base de felicidade**: ${pokemon.base_happiness}\n**Taxa de crescimento**: ${formatGrowth(pokemon.growth_rate)}`, inline: true },
        { name: 'Status base', value: `${formatStats(pokemon.stats)}`, inline: true },
        { name: 'Informações básicas', value: `**Altura**: ${pokemon.height}m\n**Peso**: ${pokemon.weight}kg`, inline: true },
      )
      .setFooter('Feito com a PokeAPI')

    return message.channel.send(pokemonEmbed)
	},
};