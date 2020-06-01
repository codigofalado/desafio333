// class Personagem {

//   constructor() {

//     this.img = img;
//     this.audio = audio;
//     this.video = video;

//   }

// }

// class Partida {

//   constructor() {

//     this.tabuleiro = new Array( 9 ).fill( 0 );
//     this.estado = 0;
//     this.pontuacao = 0;
//     this.dificuldade = 0.3;

//   }

//   get csv() {

//     return [

//       [ this.tabuleiro[ 0 ], this.tabuleiro[ 1 ], this.tabuleiro[ 2 ] ],
//       [ this.tabuleiro[ 3 ], this.tabuleiro[ 4 ], this.tabuleiro[ 5 ] ],
//       [ this.tabuleiro[ 6 ], this.tabuleiro[ 7 ], this.tabuleiro[ 8 ] ]

//     ].reduce( ( acumulador, valor ) => acumulador.toString() + "\r\n" + valor.toString() ); 
  
//   }

//   montarTabuleiro( stringTabuleiro ) {

//     this.tabuleiro = stringTabuleiro
//       .replace( '\n', ',' )
//       .replace( '\n', ',' )
//       .split( ',' )
//       .map( m => parseFloat( m ) );

//   }

//   desenharTabuleiro() {

//     for ( let i = 0; i < celulas.length; i++ ) {      
              
//       if ( state.matrix[ i ] == 0.3 && state.enemy.territory.indexOf(i) == -1 ) {
        
//         this.oponente.desenhar();

//         state.yourTurn = true;
//       }

//     }

//   }

//   obterProximoEstado() {

//     var http = new XMLHttpRequest();
//     var url = '/proximaJogada';
//     var params = `csvContent=${this.csv}&difficult=${this.dificuldade}`;

//     http.open( 'POST', url );    
//     http.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
//     http.onreadystatechange = function() {
      
//       if( http.readyState == 4 && http.status == 200 ) {

//         return JSON.parse( http.responseText );
      
//       }

//     }
//     http.send( params );

//   }

//   atribuirProximoEstado() {

//     const proximoEstado = this.obterProximoEstado();
//     this.montarTabuleiro( proximoEstado.tabuleiro );
//     this.desenharTabuleiro();


//   }

//   atribuirProximoEstado() {  


        

      

      
//   }

// }

// const partida = new Partida();

/////////////////////////////////////////////////////////////////////

function estatos( videoSrc ) { 
  
  document.querySelector('.tela').style.display = "initial";
  document.querySelector('.estatos').style.display = "flex";
  document.querySelector('video').style.display = "initial";
  
  let vid = document.querySelector('video');

  function Autoplay() { 
    vid.src = videoSrc;
    vid.autoplay = true;
    vid.load();
  }
  Autoplay()
  vid.onended = () => {
    document.querySelector('video').style.display = "none";
    document.querySelector('.estatos').style.display = "none";

    if (videoSrc == state.tieVideo) {
      openFlip();
    } else {
      document.querySelector('.dificuldade').style.display = "flex";
    }

  };
}

const state = {

  tieVideo: "../videos/Empate.mp4",
  img: "../img/miniVolvi.png",
  audio: "../trilhaSonora/WolverineGarras.mp3",
  video: "../videos/VitoriaWolverine.mp4",
  yourTurn: true,
  enemy: {
    img: "../img/miniBlob.png",
    audio: "../trilhaSonora/BlobBanha.mpeg",
    video: "../videos/VitoriaBlob.mp4",
    territory: []
  },
  matrix: new Array( 9 ).fill( 0 ),
  difficult: 0.3,
  score: 0,

  reset: function () {
    
    this.tieVideo = "../videos/Empate.mp4";
    this.img = "../img/miniVolvi.png";
    this.audio = "../trilhaSonora/WolverineGarras.mp3";
    this.video = "../videos/VitoriaWolverine.mp4";
    this.yourTurn = true;
    this.enemy.img = "../img/miniBlob.png";
    this.enemy.audio = "../trilhaSonora/BlobBanha.mpeg";
    this.enemy.video = "../videos/VitoriaBlob.mp4";
    this.enemy.territory = [];
    this.matrix = new Array( 9 ).fill( 0 );
    this.difficult = 0.3;
    this.score = 0;    

  }

}

function reset() {
  
  state.reset();

  document
    .querySelectorAll( '.sub-box img' )
    .forEach( x => x.remove() );

   
  
  // document.querySelector('.btnReset').style.top = "70%";
  // document.querySelector('.btnReset').style.left = "48%";
  // document.querySelector('.btnReset').style.zIndex = "101";
  
  
  document.querySelector('.choise').style.display = "none";

  document.querySelector('.victory').textContent = state.score;

}

document.querySelector('.victory').textContent = state.score;

// let dificuldadeEscolhida;
// let dificuldade = document.querySelector('.iniciar');
// dificuldade.addEventListener('click', choiceDificultClose);

function choiceDificultOption(elem) {
let valor = elem.className;
if( valor == "facil" ) { 
  
  state.difficult = 0.3; 

}
else if( valor == "medio" ) { 
  
  state.difficult = 0.6; 

}
else { 
  
  state.difficult = 0.9; 

  aparece = Math.round(Math.random());
  if(aparece){
    aviso();
  };

}

// if( dificuldadeEscolhida == undefined ) {
//   dificuldadeEscolhida = 0.3;
// }

document.querySelector('.dificuldade').style.display = "none";
document.querySelector('.choise').style.display = "initial";

}

function choisePerson(e) {

if (e.classList[0] == "Blob") {
  state.img = "../img/miniBlob.png";
  state.audio = "../trilhaSonora/BlobBanha.mpeg";
  state.video = "../videos/VitoriaBlob.mp4";
  state.enemy.img = "../img/miniVolvi.png";
  state.enemy.audio = "../trilhaSonora/WolverineGarras.mp3";
  state.enemy.video = "../videos/VitoriaWolverine.mp4";
}

document.querySelector('.tela').style.display = "none";
document.querySelector('.choise').style.display = "none";
}

function gameOver( estado ) {

  if(estado == "1") {
    
    const scorePesistence = state.score;
    estatos( state.enemy.video );
    document.querySelector('.fraseEstatos').innerHTML = "Você perdeu!"
    reset();
    
    state.score = scorePesistence;
    document.querySelector('.victory').textContent = state.score;

  } else if(estado == "-1") {

    estatos( state.tieVideo );
    document.querySelector('.fraseEstatos').innerHTML = "Empate!"

  } else if(estado == "0" && state.matrix.length < 9) {
    
    state.score++;
    const scorePesistence = state.score;
    estatos( state.video );
    document.querySelector('.fraseEstatos').innerHTML = "Você venceu!"      
    reset();

    state.score = scorePesistence;
    document.querySelector('.victory').textContent = state.score;

  }

}

function proximaJogada() {

const Tabuleiro = [
  [state.matrix[0], state.matrix[1], state.matrix[2]],
  [state.matrix[3], state.matrix[4], state.matrix[5]],
  [state.matrix[6], state.matrix[7], state.matrix[8]]
];

let csvContent = "";
Tabuleiro.forEach(function(rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
});

var http = new XMLHttpRequest();
var url = '/proximaJogada';
var params = 'csvContent=' + csvContent + '&difficult=' + state.difficult;
http.open("POST", url);    
http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
http.onreadystatechange = function() {//Call a function when the state changes.
  if(http.readyState == 4 && http.status == 200) {

    const jogada = JSON.parse( http.responseText );
       
    state.matrix = jogada.tabuleiro
      .replace("\n", ",")
      .replace("\n", ",")
      .split(",")
      .map( m => parseFloat( m ) );

      gameOver( jogada.estado.trim() );   

    for ( let i = 0; i < celulas.length; i++ ) {      
            
      if(state.matrix[ i ] == 0.3 && state.enemy.territory.indexOf(i) == -1) {
        state.enemy.territory.push(i);
        // CRIAR IMAGEM
        
        let img = new Image( 100, 100 );
        img.src = state.enemy.img;
        img.style.transform = `skewX(10deg) rotateZ(-46.5deg) scale(1.5) translateY(-35px)`
        document.querySelectorAll( '.sub-box' )[i].appendChild( img );
        
        let audio = new Audio();
        audio.src =  state.enemy.audio;
        audio.play();

        state.yourTurn = true;
      }
    }

     

  }}
http.send(params);

}

// ----------------------------------
const celulas = document.querySelectorAll( '.sub-box' );

for ( let i = 0; i < celulas.length; i++ ) {

celulas[ i ].onclick = function( event ) {    

      if(state.matrix[ i ] == 0 && state.yourTurn) {
    
    state.matrix[ i ] = 1;
    state.yourTurn = false

    for (let j = 0; j < document.querySelectorAll( '.sub-box img' ).length; j++) {
      const pastImg = document.querySelectorAll( '.sub-box img' )[j];
      pastImg.style.opacity = 0.7;
    }

    // CRIAR IMAGEM
    let img = new Image( 100, 100 );
    img.src = state.img;
    img.style.transform = `skewX(10deg) rotateZ(-46.5deg) scale(1.5) translateY(-35px)`
    document.querySelectorAll( '.sub-box' )[i].appendChild( img );
    let audio = new Audio();
    audio.src =  state.audio;
    audio.play();
    
    proximaJogada()      
  }
  
}

}




// ----------------------------------



function basicColor() {

let subBox = document.querySelectorAll('.sub-box');
for(let bloco of subBox) {
  bloco.style.background = "#f7f7f7";
}


document.body.style.background = "#cc636e";
document.querySelector('.lonaLadoDireito').style.background = "#BE2A2B";
document.querySelector('.lonaLadoEsquerdo').style.background = "#831C20";
document.querySelector('.lona').style.background = "#878b8d";
document.querySelector('.ringue').style.background = "#D43031";

}

function darkColor() {

let subBox = document.querySelectorAll('.sub-box');
for(let bloco of subBox) {
  bloco.style.background = "#050949";
}

document.body.style.background = "#1e202c";
document.querySelector('.ringue').style.background = "#376CE3";
document.querySelector('.lona').style.background = "#376CE3";
document.querySelector('.lonaLadoEsquerdo').style.background = "#172AB7";
document.querySelector('.lonaLadoDireito').style.background = "#1e37f7";
}

function testColor() {

let subBox = document.querySelectorAll('.sub-box');
for(let bloco of subBox) {
  bloco.style.background = "#f8fa99";
}

document.body.style.background = "#f8fce5";
document.querySelector('.ringue').style.background = "#EACC6A";
document.querySelector('.lona').style.background = "#EACC6A";
document.querySelector('.lonaLadoEsquerdo').style.background = "#BD7076";
document.querySelector('.lonaLadoDireito').style.background = "#F49F75";

}


let skin1 = document.querySelector('.op1');
skin1.addEventListener('click', basicColor);

let skin2 = document.querySelector('.op2');
skin2.addEventListener('click', darkColor);

let skin3 = document.querySelector('.op3');
skin3.addEventListener('click', testColor);

// let btn = document.querySelector('.colorOption');


function choiseColorOpen() {
document.querySelector('.op1').style.left = "60px";

document.querySelector('.op2').style.left = "110px";

document.querySelector('.op3').style.left = "162px";

document.querySelector('.colorOption').style.width = "216px";

}

function choiseColorClose() {
document.querySelector('.op1').style.left = "0px";
document.querySelector('.op2').style.left = "0px";
document.querySelector('.op3').style.left = "0px";
document.querySelector('.colorOption').style.width = "0px";
}

function choiseColorBtn() {
let left = document.querySelector('.op1').offsetLeft;  

if (left <= 10) {
  choiseColorOpen()
}
else { 
  choiseColorClose()
}
}

let pickColor = document.querySelector('.pickColor')
pickColor.addEventListener('click', choiseColorBtn)



// -------------------------------------------
//Botão Flip

function openFlip() {
  document.querySelector('.resultado').innerHTML = "Cara ou Coroa?";
  document.getElementById('mySideFlip').style.width = "350px";
  document.getElementById('coin').style.marginRight = "350px";
  let audio = new Audio();
  audio.src =  "../trilhaSonora/moeda.mp3";
  audio.play();
  }
  
  
  function closeFlip() {
  document.getElementById('mySideFlip').style.width = "0px";
  document.getElementById('coin').style.marginRight = "0px"; 
  }
  
  function flipOption() {
  let elementWidth = document.getElementById('mySideFlip').clientWidth;
  if (elementWidth == 0) {
    openFlip();
    document.querySelector('.resultado').innerHTML = "...";
  } else {
    closeFlip();
    document.querySelector('.resultado').innerHTML = "...";
  }
  
  }
  
  
function flip() {

  let valor = Math.floor(Math.random() * 2);
  
  if (valor == 0){
    document.querySelector('.resultado').innerHTML = "Cara";
  } else {
    document.querySelector('.resultado').innerHTML = "Coroa";
  }

  return valor;

}

// let coin = document.getElementById('coin');
// coin.addEventListener('click', flipOption);

// let btnFlip = document.getElementById("btnFlip");
// btnFlip.addEventListener('click', flip);


function openPlacar() {
document.querySelector('.puxaPlacarSubistituto').style.width = '200px';
document.querySelector('.puxaPlacar').style.marginRight = '200px';
}

function closePlacar() {
document.querySelector('.puxaPlacarSubistituto').style.width = '0px';
document.querySelector('.puxaPlacar').style.marginRight = '0px';  
}

function choiceEventPlacar() {
let valor = document.querySelector('.puxaPlacarSubistituto').clientWidth;
if (valor == 0){
  openPlacar()
} else {
  closePlacar()
}
}

let puxaPlacar = document.querySelector('.puxaPlacar');
puxaPlacar.addEventListener('click', choiceEventPlacar);


//--------------------------------------

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
let aviso = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function valorDoFlip(param) {
   
  let valor = param.textContent;

  flip()

  let resultado = document.querySelector('.resultado').innerHTML;

  console.log(valor, resultado)

  if (valor == resultado) {
    
    gameOver("0");

  }
  else {

    gameOver("1");

  }

  closeFlip();
  
}