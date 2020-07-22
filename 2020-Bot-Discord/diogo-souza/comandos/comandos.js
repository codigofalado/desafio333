const Discord = require("discord.js");
const bot = require("../bot");

module.exports = {
  name: "comandos",
  description: "Lista todos os comandos",
  aliases: ["commands", "cmds", "cmd", "help", "ajuda"],
  emoji: ":grey_question:",
  async execute(message) {
    const rawCmds = bot.commands;
    const comandos = Array.from(rawCmds.keys());

    const embed = await new Discord.MessageEmbed()
      .setTitle("Comandos disponíveis:")
      .setDescription(
        "Veja a lista de todos os comandos disponíveis: \n \u200B"
      )
      .setColor("#0099ff");

    comandos.map((comando) => {
      const { name, description, emoji } = rawCmds.get(comando);
      embed.addField(`${emoji}  !s ${name}`, description, true);
    });

    return message.author
      .send(embed)
      .then(() => {
        if (message.channel.type === "dm") return;
        message.reply(
          `Acabei de te enviar uma DM com a lista de meus comandos! :smile: `
        );
      })
      .catch((error) => {
        console.error(
          `Could not send help DM to ${message.author.tag}.\n`,
          error
        );
        message.reply(
          "Ocorreu um erro enquanto eu enviava a lista de comandos :pleading_face: :pensive: , tente novamente"
        );
      });
  },
};
