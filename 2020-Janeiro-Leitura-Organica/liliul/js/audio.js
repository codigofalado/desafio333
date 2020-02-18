let musica = new Array()

musica[0] = "musica/Johan Lindell - Det låter som regn.mp3"
musica[1] = "musica/JohanLindell-OnTheRoof.mp3"
musica[2] = "musica/Men At Work - Who Can It Be Now.mp3"
musica[3] = "musica/TearsForFears-Shout.mp3"

randomizar = Math.floor(Math.random() * musica.length)
let ramdom = musica[randomizar]

let Audio = document.getElementById('audio');
Audio.innerHTML=`	<source src="${ramdom}"  type="audio/mpeg">`


let play = document.getElementById('play');

let pause = document.getElementById('pause');

let playShow = function() {
  Audio.play();
  play.style.display = "none";
  pause.style.display = "inline-block";
};


let pauseShow = function() {
  Audio.pause();
  play.style.display = "inline-block";
  pause.style.display = "none";
};
