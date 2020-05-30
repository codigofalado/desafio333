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

app.post('/proximaJogada', function(req, res) {
  
  exec('octave-cli --eval "cd src/scripts; csvwrite("Tabuleiro.csv", [0 0 0; 0 0 0; 0 0 0]); ProximaJogada_(0.5)"', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  
})

app.listen(3000, err => {
  console.log("Server is listening on 3000");
});