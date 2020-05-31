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
    console.log('Gravando tabuleiro...');
    console.log(req.body.csvContent);
  });

  await exec('octave-cli --eval "cd src/scripts; ProximaJogada_(' + req.body.difficult + ')"', async (err, stdout, stderr) => {
    if (err) throw err;
    
    console.log('Executando octave...');
    
    await fs.readFile('src/scripts/Tabuleiro.csv', "utf8", (err, data) => {      
      if (err) throw err;
      console.log('Retornando tabuleiro...');
    });

  });  

});

// app.post('/obterParametroParaScriptOctave', function(req, res) {
  
//   fs.readFile('src/scripts/Tabuleiro.csv', "utf8", (err, data) => {      
//     if (err) throw err;
//     console.log("Gravando...")
//     console.log(data)

//     fs.writeFile('src/scripts/Tabuleiro.csv', req.body.csvContent, (err) => {
//       if (err) throw err;    
//       console.log("Conteúdo a ser gravado:");
//       console.log(req.body.csvContent)

//       fs.readFile('src/scripts/Tabuleiro.csv', "utf8", (err, data) => {      
//         if (err) throw err;
//         console.log("Gravado...")
//         console.log(data)
        
//         exec('octave-cli --eval "cd src/scripts; ProximaJogada_(' + req.body.difficult + ')"', (error, stdout, stderr) => {
//           if (error) {
//             // console.error(`exec error: ${error}`);
//             return;
//           }
      
//           // console.log(`stdout: ${stdout}`);
//           // console.error(`stderr: ${stderr}`);
      
//           fs.readFile('src/scripts/Tabuleiro.csv', "utf8", (err, data) => {      
//             if (err) throw err;
//             console.log("Octave processou.")
//             console.log(data);
//             res.send(data)
//           });
          
//         }); 

//       });

//     });

//   });   

// })

app.listen(3000, err => {
  console.log("Server is listening on 3000");
});