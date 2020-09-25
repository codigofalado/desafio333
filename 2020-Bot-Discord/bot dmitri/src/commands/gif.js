const fetch = require('node-fetch');


const execute = (bot,msg,args) => {
    const text = args.join(" ")
        fetch(`https://api.tenor.com/v1/random?key=${process.env.GIF}&q=${text}&limit=1`)
          .then(res => res.json())
          .then(json => msg.channel.send(json.results[0].url))
          .catch(e => {
            msg.channel.send('Não achei nenhum gif com esse nome, tenta pesquisar novamente com algo mais claro');
            // console.error(e);
            return;
          });
      }
module.exports = {
    name: "gif",
    help: "Mostra um gif do que você quiser, só escrever .gif e o que quer pesquisar",
    execute,
}