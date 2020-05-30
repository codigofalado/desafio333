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

app.post('/obterParametroParaScriptOctave', function(req, res) {
  
  fs.writeFileSync('src/scripts/Tabuleiro.csv', req.body.csvContent, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  res.send();

})

app.post('/calcularProximaJogada', function(req, res) {

  exec('octave-cli --eval "cd src/scripts; ProximaJogada_(' + req.body.difficult + ')"', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

  res.send();
  
})

app.get('/lerRespostaDoOctave', function(req, res) {
  
  fs.readFileSync('src/scripts/Tabuleiro.csv', (err, data) => {
    if (err) throw err;
    res.send(data);
  });

})

app.listen(3000, err => {
  console.log("Server is listening on 3000");
});