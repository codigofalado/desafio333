import { Message } from 'discord.js';
import { isUndefined } from 'util';

function generateRandomNumber(range: number) {
  return Math.floor(Math.random() * range) + 1
}

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'roll',
  args: false,
  usage: '<tipo> <vezes> || <vezes>',
  guildOnly: false,
	description: 'Rola o dado a quantidade de vezes que você especificou',
	execute(message: Message, args: Array<string>) {
    const types = ['d2', 'd4', 'd6', 'd8', 'd10', 'd20', 'd100']
    const type = args[0]
    let times = parseInt(args[1])
    let defaultNumber = 6
    let uniqueRolls = ''
    
    if (isUndefined(args[1])) times = 1

    if (args.length === 0 || !isNaN(parseInt(type))) {
      let total = 0
      times = parseInt(type)
      
      for (let i = 0; i < times; i++) {
        const result = generateRandomNumber(defaultNumber) 
        uniqueRolls += `Jogada ${i+1}: \`${result}\`\n`
        total += result
      }
      return message.channel.send(`${uniqueRolls}:game_die: Você rodou o \`d6\` ${times} vez(es) e o total obtido foi \`${total}\``)
    }

    if (!types.includes(type)) {
      return message.channel.send('O dado que você digitou não existe!')
    }

    if (times <= 0 || isNaN(times)) {
      return message.channel.send('O valor do segundo paramêtro deve ser numérico e maior que 0')
    }


    switch (type) {
      case 'd2':
        defaultNumber = 2
        break;      
      case 'd4':
        defaultNumber = 4
        break;
      case 'd6':
        defaultNumber = 6
        break;
      case 'd8':
        defaultNumber = 8
        break;
      case 'd20':
        defaultNumber = 20
        break;
      case 'd100':
        defaultNumber = 100
        break;
    }

    let total = 0
    for (let i = 0; i < times; i++) {
      const result = generateRandomNumber(defaultNumber) 
      uniqueRolls += `Jogada ${i+1}: \`${result}\`\n`
      total += result
    }
    return message.channel.send(`${uniqueRolls}:game_die: Você rodou o \`${type}\` ${times} vez(es) e o total obtido foi \`${total}\``)
	},
};