import { Message } from 'discord.js';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'random-number',
  args: true,
  usage: '<number> <number>',
  guildOnly: false,
	description: 'Gera um número aleatório no intervalo do primeiro parâmetro até o segundo, sem contar com ele.',
	execute(message: Message, args: Array<string>) {
    let number1 = parseInt(args[0])
    let number2 = parseInt(args[1])

    if (isNaN(number1) || isNaN(number2)) return message.channel.send(':negative_squared_cross_mark: Algum dos parâmetros passados não é um número.');

    if (number1 >= number2) return message.channel.send(':negative_squared_cross_mark: O primeiro número deve ser menor que o segundo.'); 
  
    const result = Math.floor(number1 + Math.random() * number2)

    return message.channel.send(`:white_check_mark: O número obtido foi ${result}`)
  },
};