const { exec } = require('child_process');
const fs = require('fs')

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, './src/public/styles')));
app.use(express.static(path.join(__dirname, './src/public')));
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const indexRouter = require('./src/router/index');

app.get('/', indexRouter);

app.post('/proximaJogada', async function(req, res) {

  await fs.writeFile('src/scripts/Tabuleiro.csv', req.body.csvContent, (err) => {
    
    if (err) throw err;    
    console.clear();
    console.log('INÍCIO DA JOGADA ---------------------------------------------');
    console.log('( 1 ) Gravando tabuleiro...');
    console.log(req.body.csvContent);

  });

  await exec('octave-cli --eval "cd src/scripts; ProximaJogada_(' + req.body.difficult + ')"', async (err, stdout, stderr) => {
    
    const jogada = { tabuleiro: null, estado: null };

    if (err) throw err;    
    console.log('( 2 ) Executando octave...');
    
    await fs.readFile('src/scripts/Tabuleiro.csv', "utf8", async (err, tabuleiro) => {      
      if (err) throw err;
      console.log('( 3 ) Retornando tabuleiro...');
      console.log(tabuleiro);
      
      await fs.readFile('src/scripts/maquinaGanha.csv', "utf8", (err, estado) => {      
        if (err) throw err;
        console.log('( 3 ) Retornando objeto da jogada...');
        console.log(estado);
        
        console.log('FIM DA JOGADA ----------------------------------------------');
        jogada.tabuleiro = tabuleiro;
        jogada.estado = estado;
        res.send( jogada );
      });

    });   

  });  

});

app.listen(3000, err => {
  console.log("Server is listening on 3000");
});