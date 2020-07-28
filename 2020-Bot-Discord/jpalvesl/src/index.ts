import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';

import { prefix, token } from '../config.json';

interface commandInterface {
  name: string;
  args?: boolean;
  usage: string;
  guildOnly?: boolean;
	description: string;
	execute: Function;
}

const client = new Discord.Client();
const commands = new Discord.Collection();

const commandFiles = fs.readdirSync(path.resolve(__dirname, 'commands')).filter(file => file.endsWith('.ts'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)

  commands.set(command.name, command)
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift()?.toLowerCase();
  
  // console.log(commandName)
  // console.log(args)
  // console.log(commands.has(commandName)) 

  if (!commands.has(commandName)) return;
  
  try {
    const command = commands.get(commandName) as commandInterface
    
    if (command.guildOnly && message.channel.type !== 'text') {
      return message.reply('Eu não posso executar esse comando em messagem direta!');
    }
    
    if (command.args && !args.length) {
      let reply = `Você não passou nenhum argumento, ${message.author}!`

      if (command.usage) {
        reply += `\nA propriedade usada deve ser: \`${prefix}${command.name} ${command.usage}\``
      }

      return message.channel.send(reply);
    }

    command.execute(message, args)
  } catch (error) {
    message.channel.send('Erro ao executar comando, tente novamente')
  }
}); 

client.login(token)
  .then(() => console.log('Bot Logado'))
  .catch(err => console.log(err))