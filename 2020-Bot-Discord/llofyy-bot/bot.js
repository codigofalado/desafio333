const Discord = require('discord.js');
const client = new Discord.Client();

const Tenor = require('tenorjs').client({
    "Key": "",
    "Filter": "off",
    "Locale": "pt_br",
    "MediaFilter": "minimal",
    "DateFormat": "D/MM/YYYY - H:mm:ss A"
});


client.login("");

client.on('ready', () => {
    console.log(`Logado como ${client.user.username}!`);
});

client.on('message', msg => {
    if(msg.content == "!gif"){
        Tenor.Search.Random(msg.content, "1").then(Results => {
            Results.forEach(Post => {
                msg.reply(Post.url);
            });
        }).catch(console.error);
    }

    if(msg.content.startsWith("!gif") && msg.content != "!gif"){
        var content = msg.content.replace(/!gif/i, '');
        Tenor.Search.Random(content, "1").then(Results => {
            Results.forEach(Post => {
                msg.reply(Post.url);
            });
        }).catch(console.error);
    }
});



