import Discord from 'discord.js';
import { prefix, token } from '../config.json';

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(token)
  .then(() => console.log('Bot Logado'))
  .catch(err => console.log(err))