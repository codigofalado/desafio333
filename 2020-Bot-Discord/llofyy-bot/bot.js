const Discord = require('discord.js');
const client = new Discord.Client();
const {rastro} = require('rastrojs');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

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

// COMANDOS

// MOSTRA GIFS ALEATÓRIOS COM OU SEM PALAVRA CHAVE
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
        var contentEspacos = content.trim();
        Tenor.Search.Random(contentEspacos, "1").then(Results => {
            Results.forEach(Post => {
                msg.reply(Post.url);
            });
        }).catch(console.error);
    }


    // FAZ O RASTREIO DE UM CÓDIGO DOS CORREIOS E MOSTRA OS DADOS DO PACOTE
    if(msg.content.startsWith("!rastreio") && msg.content != "!rastreio"){
        async function exemplo(){
            const content = msg.content.replace(/!rastreio/i, '');
            const contentEspacos = content.trim(content);
            
            const track = await rastro.track(contentEspacos);
            const rastreio = track.map((item, indice) => {
                const local = item.tracks.map((item, indice) => {
                    return msg.reply(`**CÓDIGO DE RASTREIO:** ${contentEspacos}

**${item.trackedAt}:** ${item.status} ${item.observation}`);
                });
                return local;
            });
        };

        exemplo();
    }

    // MOSTRA OS DADOS GLOBAIS OU DO BRASIL DO COVID-19 
    if(msg.content == "!covid -g"){
        var url = 'https://coronavirus-19-api.herokuapp.com/all';
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var dados = xmlhttp.responseText;
                var dadosJSON = JSON.parse(dados);
                msg.reply(`** DADOS GLOBAIS SOBRE O COVID-19**

                    **casos**: ${dadosJSON.cases}

                    **mortes**: ${dadosJSON.deaths}

                    **recuperados**: ${dadosJSON.recovered}

*Não são dados exatos, todos os números podem conter diferenças de outras fontes.*
                `);
                
            }
        }

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    if(msg.content == "!covid -brasil"){
        var url = 'https://coronavirus-19-api.herokuapp.com/countries/Brazil';
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var dados = xmlhttp.responseText;
                var dadosJSON = JSON.parse(dados);
                msg.reply(`** DADOS SOBRE O COVID-19 DO BRASIL**

                    **casos**: ${dadosJSON.cases}

                    **mortes**: ${dadosJSON.deaths}

                    **recuperados**: ${dadosJSON.recovered}

                    **casos de hoje**: ${dadosJSON.todayCases}

                    **mortes de hoje**: ${dadosJSON.todayDeaths}

*Não são dados exatos, todos os números podem conter diferenças de outras fontes.*
                `);
                
            }
        }

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    // EXPLICAÇÃO SOBRE OS DADOS DA API DO COVID-19
    if(msg.content == "!covid -info"){
        msg.reply(`**Sobre esses dados**

**Mudam rapidamente**
*Os dados mudam rapidamente e podem não mostrar alguns dos casos que ainda não foram informados.*

**Incluem somente as pessoas testadas**
*Os casos incluem somente pessoas que tiveram testes com resultado positivo. As regras e a disponibilidade dos testes podem variar de acordo com o país. Talvez você não veja dados sobre algumas áreas porque não há registros da publicação ou da coleta recente dessas informações.*

**Por que vejo dados distintos em fontes diferentes?**
*Existem várias fontes que monitoram e agregam dados sobre o coronavírus. Essas informações são atualizadas em momentos distintos e talvez sejam coletadas de maneiras diferentes.*
        `);
    }
});



