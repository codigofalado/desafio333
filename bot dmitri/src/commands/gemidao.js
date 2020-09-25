const execute = (bot, msg, args) => {
    let string = "AAAWN AAAA AN A AWNAAAA AAAWN AAAA AN A AWNAAAA \n";
    // bot.commands.forEach((command) => {
    //     if (command.help) {
    //         string += `**${process.env.PREFIX}${command.help}**: ${command.help}\n`;
    //     }
    // });
    return msg.channel.send(string);
};

module.exports = {
    name: "gemidao",
    help: ".gemidao -> Exibe o gemidao",
    execute,
};
