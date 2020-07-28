import { Message } from 'discord.js';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'coinflip',
  args: false,
  usage: '<numero>',
  guildOnly: false,
	description: 'Gira a moeda com um numero definido de repetições!',
	execute(message: Message, args: Array<string>) {
    let cara = 0;
    let coroa = 0;
    let times = parseInt(args[0])
    if (times <= 0 || !times) times = 1; 

    for (let i = 0; i < times; i++) {
      const result = Math.floor(Math.random() * 2)
      
      if (result === 0) {
        cara++
      } 
      else {
        coroa++
      }
    }

		message.channel.send(`A moeda foi girada ${times} veze(s)\n${cara} veze(s) caiu cara\n${coroa} vezes caiu coroa`);
	},
};