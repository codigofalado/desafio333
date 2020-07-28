import { Message, MessageEmbed } from 'discord.js';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando base64', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Codifica e decodifica códigos base64')
  .addFields([
    { name: 'Modo de usar', value: `\`${process.env.PREFIX}base64 <função> <frase>\`` },
    { name: 'Parâmetros', value: `\`frase\` - frase a ser codificado ou decodificada.\n\`\`função\` - pode ser *encode* ou *decode*` }
  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'base64',
  args: true,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Retorna uma mesangem com todos os comandos presentes no bot e também caso você passe o nome do comando como parâmetro ele lista informações sobrbe o comando específico.',
	execute(message: Message, args: Array<string>) {
    const commandType = args.shift()
    

    if (commandType === 'encode') {
      const encodedMessage = new Buffer(args.join(' ')).toString('base64')

      return message.channel.send(`**A frase codificada é**: \n${encodedMessage}`)
    }
    else if (commandType === 'decode') {
      var decodedMessage = new Buffer(args[0], "base64").toString("ascii")

      return message.channel.send(`**A frase decodificada é**: \n${decodedMessage}`)
    }
	},
};