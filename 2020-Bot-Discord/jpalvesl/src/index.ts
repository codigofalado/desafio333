import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';

import { prefix, token } from '../config.json';

export interface commandInterface {
  name: string;
  args?: boolean;
  usage: string;
  guildOnly?: boolean;
	description: string;
	execute: Function;
}

const client = new Discord.Client();
const commands: Discord.Collection<string, commandInterface> = new Discord.Collection();

const commandFiles = fs.readdirSync(path.resolve(__dirname, 'commands')).filter(file => file.endsWith('.ts'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)

  commands.set(command.name, command)
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  client.user?.setActivity(`${prefix}help para mais informações`)
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift()?.toLowerCase() as string;
  

  if (!commands.has(commandName)) return;
  
  try {
    const command = commands.get(commandName) as commandInterface
    
    if (command.guildOnly && message.channel.type !== 'text') {
      return message.reply('Eu não posso executar esse comando em messagem direta!');
    }
    
    if (command.args && !args.length) 
      return message.channel.send(`Você não passou nenhum argumento, ${message.author}, para saber mais sobre o comando digite \`${prefix}help <comando>\``);

    
    command.execute(message, args, commands)
  } catch (error) {
    message.channel.send('Erro ao executar comando, tente novamente')
  }
}); 

client.login(token)
  .catch(err => console.log(err))