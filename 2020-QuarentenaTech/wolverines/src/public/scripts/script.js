const difficult = 0.2;

function choisePerson() {
  document.querySelector('.tela').style.display = "none";
  document.querySelector('.choise').style.display = "none";
}

function obterParametroParaScriptOctave(matriz) {

  const Tabuleiro = [
    [matriz[0], matriz[1], matriz[2]],
    [matriz[3], matriz[4], matriz[5]],
    [matriz[6], matriz[7], matriz[8]]
  ];

  let csvContent = "";
  Tabuleiro.forEach(function(rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
  });

  var http = new XMLHttpRequest();
  var url = '/obterParametroParaScriptOctave';
  var params = 'csvContent=' + csvContent;
  http.open("POST", url, true);    
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          console.log(http.responseText);
      }}
  http.send(params);

}

function proximaJogada() {

  var http = new XMLHttpRequest();
  var url = '/calcularProximaJogada';
  var params = 'difficult=' + difficult;

  http.open("POST", url, true);    
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          console.log(http.responseText);
      }}
  http.send(params);

}

function lerRespostaDoOctave(matriz) {

  const Tabuleiro = [
    [matriz[0], matriz[1], matriz[2]],
    [matriz[3], matriz[4], matriz[5]],
    [matriz[6], matriz[7], matriz[8]]
  ];

  let csvContent = "";
  Tabuleiro.forEach(function(rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
  });

  var http = new XMLHttpRequest();
  var url = '/lerRespostaDoOctave';
  http.open("GET", url, true);    
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {

        matriz = http.responseText
          .replace("\n", ",")
          .replace("\n", ",")
          .split(",");

        console.log(matriz)

      }}
  http.send();

}

// ----------------------------------
const celulas = document.querySelectorAll( '.sub-box' );

const matriz = new Array( 9 ).fill( 0 );

for ( let i = 0; i < celulas.length; i++ ) {

  celulas[ i ].onclick = function( event ) {    

    // GERAR MATRIZ DA JOGADA

    if(matriz[ i ] != 1) {
      matriz[ i ] = 1;
      // CRIAR IMAGEM
      let wolve = new Image( 100, 100 );
      wolve.src = '../img/miniVolvi.png';
      wolve.style.transform = `skewX(10deg) rotateZ(-46.5deg) scale(1.5) translateY(-35px)`
      document.querySelectorAll( '.sub-box' )[i].appendChild( wolve );
      let audio = new Audio();
      audio.src =  "../trilhaSonora/WolverineGarras.mp3";
      audio.play();

      obterParametroParaScriptOctave(matriz)
      proximaJogada();
      lerRespostaDoOctave(matriz);
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


function openFlip() {
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
    document.querySelector('.resultado').innerHTML = "Par";
  } else {
    document.querySelector('.resultado').innerHTML = "Impar";
  }

}

let coin = document.getElementById('coin');
coin.addEventListener('click', flipOption);

let btnFlip = document.getElementById("btnFlip");
btnFlip.addEventListener('click', flip);


function choiseColorOpen() {
  document.querySelector('.op1').style.left = "70px";
  
  document.querySelector('.op2').style.left = "120px";
  
  document.querySelector('.op3').style.left = "170px";
  
}

function choiseColorClose() {
  document.querySelector('.op1').style.left = "0px";
  document.querySelector('.op2').style.left = "0px";
  document.querySelector('.op3').style.left = "0px";
}

function choiseColorBtn() {
  let left = document.querySelector('.op1').offsetLeft;  
  
  if (left <= 10) {
    choiseColorOpen()

    document.querySelector('video').style.display = "initial";
    let vid = document.querySelector('video');
    function Autoplay() { 
      vid.autoplay = true;
      vid.load();
    }
    Autoplay()
    vid.onended = () => {
      document.querySelector('video').style.display = "none";
    };

  }
  else { 
    choiseColorClose()
  }
}

let pickColor = document.querySelector('.pickColor')
pickColor.addEventListener('click', choiseColorBtn)


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
