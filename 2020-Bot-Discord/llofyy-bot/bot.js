const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const client = new Client();
const { rastro } = require('rastrojs');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const fs = require('fs');
const TeemoJS = require('teemojs');
const lolKey = "SUA KEY DE RIOT DEVELOPER AQUI";
const api = TeemoJS(lolKey);


const Tenor = require('tenorjs').client({
    "Key": "SUA KEY DA API DO TERNOR AQUI",
    "Filter": "off",
    "Locale": "pt_br",
    "MediaFilter": "minimal",
    "DateFormat": "D/MM/YYYY - H:mm:ss A"
});


client.login("SEU TOKEN DO DISCORD AQUI");

client.on('ready', () => {
    console.log(`Logado como ${client.user.username}!`);
});

// COMANDOS

// MOSTRA GIFS ALEATÓRIOS COM OU SEM PALAVRA CHAVE
client.on('message', msg => {
    if (msg.content == "!gif") {
        Tenor.Search.Random(msg.content, "1").then(Results => {
            Results.forEach(Post => {
                msg.reply(Post.url);
            });
        }).catch(console.error);
    }

    if (msg.content.startsWith("!gif") && msg.content != "!gif") {
        var content = msg.content.replace(/!gif/i, '');
        var contentEspacos = content.trim();
        Tenor.Search.Random(contentEspacos, "1").then(Results => {
            Results.forEach(Post => {

                msg.reply(Post.url);
            });
        }).catch(console.error);
    }


    // FAZ O RASTREIO DE UM CÓDIGO DOS CORREIOS E MOSTRA OS DADOS DO PACOTE
    if (msg.content.startsWith("!rastreio") && msg.content != "!rastreio") {
        async function exemplo() {
            const content = msg.content.replace(/!rastreio/i, '');
            const contentEspacos = content.trim(content);

            const track = await rastro.track(contentEspacos);
            const rastreio = track.map((item, indice) => {
                const local = item.tracks.map((item, indice) => {
                    if(item.status.startsWith("objeto postado")){
                        const embed = new MessageEmbed()
                                .setColor('#ff1a75')
                                .setThumbnail(`https://i.imgur.com/Rx52MUN.png`)
                                .setAuthor('Correios', 'https://media.glassdoor.com/sqll/732031/empresa-brasileira-de-correios-e-telegrafos-ect-squarelogo-1576639620796.png')
                                .setDescription(`Detalhes de envio do código **${contentEspacos}**`)
                                .addField('status:', `${item.status}`, true)
                                .setFooter(item.trackedAt);

                            return msg.channel.send(embed);
                    }

                    if(item.status.startsWith("objeto encaminhado")){
                        const embed = new MessageEmbed()
                                .setColor('#ff1a75')
                                .setThumbnail(`https://i.imgur.com/Nu9mOLv.png`)
                                .setAuthor('Correios', 'https://media.glassdoor.com/sqll/732031/empresa-brasileira-de-correios-e-telegrafos-ect-squarelogo-1576639620796.png')
                                .setDescription(`Detalhes de envio do código **${contentEspacos}**`)
                                .addField('status:', `${item.status} ${item.observation}`, true)
                                .setFooter(item.trackedAt);

                            return msg.channel.send(embed);
                    }

                    if(item.status.startsWith("objeto aguardando retirada")){
                        const embed = new MessageEmbed()
                                .setColor('#ff1a75')
                                .setThumbnail(`https://i.imgur.com/vUQms7c.png`)
                                .setAuthor('Correios', 'https://media.glassdoor.com/sqll/732031/empresa-brasileira-de-correios-e-telegrafos-ect-squarelogo-1576639620796.png')
                                .setDescription(`Detalhes de envio do código **${contentEspacos}**`)
                                .addField('status:', `${item.status} ${item.observation}`, true)
                                .setFooter(item.trackedAt);

                            return msg.channel.send(embed);
                    }

                    if(item.status.startsWith("objeto entregue")){
                        const embed = new MessageEmbed()
                                .setColor('#ff1a75')
                                .setThumbnail(`https://i.imgur.com/CraY6Ob.png`)
                                .setAuthor('Correios', 'https://media.glassdoor.com/sqll/732031/empresa-brasileira-de-correios-e-telegrafos-ect-squarelogo-1576639620796.png')
                                .setDescription(`Detalhes de envio do código **${contentEspacos}**`)
                                .addField('status:', `${item.status}`, true)
                                .setFooter(item.trackedAt);

                            return msg.channel.send(embed);
                    }
                    
                });
                return local;
            });
        };

        exemplo();
    }

    // MOSTRA OS DADOS GLOBAIS OU DO BRASIL DO COVID-19 
    if (msg.content == "!covid -g") {
        var url = 'https://coronavirus-19-api.herokuapp.com/all';
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var dados = xmlhttp.responseText;
                var dadosJSON = JSON.parse(dados);
                const embed = new MessageEmbed()
                                .setColor('#ff1a75')
                                .setThumbnail('https://i.imgur.com/F61bgb1.png')
                                .setAuthor('COVID-19 GLOBAL')
                                .setDescription(`Dados do Covid-19 no Mundo`)
                                .addFields(
                                    { name: 'Casos', value: dadosJSON.cases, inline: true },
                                    { name: 'Mortes', value: dadosJSON.deaths, inline: true },
                                    { name: 'Recuperados', value: dadosJSON.recovered, inline: true },
                                )
                                .setTimestamp()
                                .setFooter('Dados enviados');

                                msg.channel.send(embed);

            }
        }

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    if (msg.content == "!covid -br") {
        var url = 'https://coronavirus-19-api.herokuapp.com/countries/Brazil';
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var dados = xmlhttp.responseText;
                var dadosJSON = JSON.parse(dados);
                const embed = new MessageEmbed()
                                .setColor('#ff1a75')
                                .setThumbnail('https://i.imgur.com/F61bgb1.png')
                                .setAuthor('COVID-19 BRASIL')
                                .setDescription(`Dados do Covid-19 no Brasil`)
                                .addFields(
                                    { name: 'Casos', value: dadosJSON.cases, inline: true },
                                    { name: 'Mortes', value: dadosJSON.deaths, inline: true },
                                    { name: 'Recuperados', value: dadosJSON.recovered, inline: true },
                                    { name: 'Casos de Hoje', value: dadosJSON.todayCases, inline: true },
                                    { name: 'Mortes de Hoje', value: dadosJSON.todayDeaths, inline: true },
                                )
                                .setTimestamp()
                                .setFooter('Dados enviados');

                                msg.channel.send(embed);

            }
        }

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    // TRAZ A COTAÇÃO ATUAL DO DÓLAR
    if (msg.content == "!dollar") {
        var url = "https://economia.awesomeapi.com.br/all/USD-BRL";
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var dados = xmlhttp.responseText;
                var dadosJSON = JSON.parse(dados);
                var dollarMax = parseFloat(dadosJSON.USD.high);
                var dollarMin = parseFloat(dadosJSON.USD.low);
                const embed = new MessageEmbed()
                                .setColor('#ff1a75')
                                .setThumbnail('https://www.iconpacks.net/icons/2/free-coin-dollar-icon-2686-thumb.png')
                                .setAuthor('Dollar')
                                .setDescription(`Cotação do Dollar`)
                                .addFields(
                                    { name: 'MAX', value: `${dollarMax.toFixed(2)}R$`, inline: true },
                                    { name: 'MIN', value: `${dollarMin.toFixed(2)}R$`, inline: true },
                                )
                                .setTimestamp()
                                .setFooter('Dados enviados');

                                msg.channel.send(embed);
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();

    }

    // TRAZ A COTAÇÃO ATUAL DO BITCOIN
    if (msg.content == "!bitcoin") {
        var url = "https://economia.awesomeapi.com.br/all/BTC-BRL";
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var dados = xmlhttp.responseText;
                var dadosJSON = JSON.parse(dados);
                var bitcoinMax = parseFloat(dadosJSON.BTC.high);
                var bitcoinMin = parseFloat(dadosJSON.BTC.low);
                const embed = new MessageEmbed()
                                .setColor('#ff1a75')
                                .setThumbnail('https://images.vexels.com/media/users/3/144837/isolated/preview/40f189daa5c0279718484ca5f5569f78-bitcoin-icon-by-vexels.png')
                                .setAuthor('Bitcoin')
                                .setDescription(`Cotação do Bitcoin`)
                                .addFields(
                                    { name: 'MAX', value: `${bitcoinMax}R$`, inline: true },
                                    { name: 'MIN', value: `${bitcoinMin}R$`, inline: true },
                                )
                                .setTimestamp()
                                .setFooter('Dados enviados');

                                msg.channel.send(embed);
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
    }

    // MOSTRA A IMAGEM DE PERFIL DO USUÁRIO   
    if (msg.content === "!avatar") {
        const attachment = new MessageAttachment(msg.author.displayAvatarURL());
        msg.reply(attachment);
    }

    // F NO CHAT MOSTRA R.I.P
    if (msg.content === "F" || msg.content === "f") {
        const attachment = new MessageAttachment("https://i.imgur.com/w3duR07.png");
        msg.channel.send(attachment);
    }


    // MOSTRA O ELO NO LOL DO PLAYER INSERIDO 
    if (msg.content.startsWith("!elo")) {
        var content = msg.content.replace(/!elo/i, '');
        var contentEspacos = content.trim();
        api.get('br1', 'summoner.getBySummonerName', contentEspacos).then(data => {
            var url = `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.id}?api_key=${lolKey}`;
            xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var dados = xmlhttp.responseText;
                    var dadosFormatado = dados.replace('RANKED_SOLO_5x5', 'Ranqueada Solo').replace('RANKED_FLEX_SR', 'Ranqueada Flex 5x5').replace('SILVER', 'PRATA');
                    var dadosArray = dadosFormatado.split(', ');
                    var dadosJSON = JSON.parse(dadosArray);
                    dadosJSON.forEach((player) => {


                        if (player.tier === "CHALLENGER" || player.tier === "MASTER" || player.tier === "GRANDMASTER") {
                            const embed = new MessageEmbed()
                                .setColor('#ff1a75')
                                .setAuthor('League Of Legends', 'https://s3.amazonaws.com/file.imleagues/Images/Leagues/Uploaded/201803/20183612017256eacbe80750b5456c4fe8eba04dc1ffff.png')
                                .setDescription(`Dados de **${data.name}**`)
                                .setThumbnail(`https://ddragon.leagueoflegends.com/cdn/10.13.1/img/profileicon/${data.profileIconId}.png`)
                                .addField('Nível', data.summonerLevel, true)
                                .addFields(
                                    { name: 'ELO:', value: `**${player.tier}** | ${player.queueType}` },
                                    { name: '\u200B', value: '\u200B' },
                                    {name: "Pdl's", value: player.leaguePoints, inline: true},
                                    { name: 'Vitórias', value: player.wins, inline: true },
                                    { name: 'Derrotas', value: player.losses, inline: true },
                                )
                                .setTimestamp()
                                .setFooter('Dados enviados');

                                msg.channel.send(embed);
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#ff1a75')
                                .setThumbnail(`https://ddragon.leagueoflegends.com/cdn/10.13.1/img/profileicon/${data.profileIconId}.png`)
                                .setAuthor('League Of Legends', 'https://s3.amazonaws.com/file.imleagues/Images/Leagues/Uploaded/201803/20183612017256eacbe80750b5456c4fe8eba04dc1ffff.png')
                                .setDescription(`Dados de **${data.name}**`)
                                .addField('Nível', data.summonerLevel, true)
                                .addFields(
                                    { name: 'ELO:', value: `**${player.tier} ${player.rank}** | ${player.queueType}` },
                                    { name: '\u200B', value: '\u200B' },
                                    {name: "Pdl's", value: player.leaguePoints, inline: true},
                                    { name: 'Vitórias', value: player.wins, inline: true },
                                    { name: 'Derrotas', value: player.losses, inline: true },
                                )
                                .setTimestamp()
                                .setFooter('Dados enviados');

                                msg.channel.send(embed);
                        }
                    });
                }
            }
            xmlhttp.open('GET', url, true);
            xmlhttp.send();
        });

    }





});



