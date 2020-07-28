import { Message } from 'discord.js';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: '8ball',
  args: true,
  usage: '<question>',
  guildOnly: false,
	description: 'Ping!',
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