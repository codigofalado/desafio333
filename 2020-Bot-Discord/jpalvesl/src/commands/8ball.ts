import { Message, MessageEmbed } from 'discord.js';
import { prefix } from '../../config.json';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando 8ball', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Retorna uma resposta da toda poderosa bola 8')
  .addFields([
    { name: 'Modo de usar', value: `\`${prefix}8ball <pergunta>\` - Entrega uma resposta da bola 8 baseada na pergunta que foi feita.` },
    { name: 'Parâmetros', value: `\`pergunta\` - A pergunta a ser respondida.` }

  ])
  .setFooter('Não inclua <> ou [] no comando.')

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: '8ball',
  args: true,
  usage: helpEmbed,
  guildOnly: false,
	description: 'Simula o funcionamento de uma magic 8ball.',
	execute(message: Message, args: Array<string>) {
    const options = [
      /* Afirmativas */ 
      'É certo', 'Sem sombra de dúvidas', 'Sem dúvidas', 'Sim, definitivamente', 'Você pode contar com isso',
      'Como eu sei, sim', 'Provavelmente', 'Tem boa chance', 'Sim', 'Sinais apontam que sim',
      /* Sem compromisso */
      'Resposta nebulosa, tente novamente', 'Pergunte novamente mais tarde', 'Melhor não contar isso agora', 'Agora não consigo prever', 'Concentre-se e pergunte novamente', 
      /* Negativas */
      'Não conte com isso', 'Minha responsa é não', 'Minhas fontes dizem não', 'Chances não tão boas', 'Muito duvidoso', 
    ]

    const selected = Math.floor(Math.random() * 20)

		message.channel.send(`:speech_balloon: ${options[selected]}`);
	},
};