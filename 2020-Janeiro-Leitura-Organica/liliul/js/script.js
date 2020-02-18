let texto = new Array()

texto[0] = "textos/noticia.html"
texto[1] = "textos/esporte.html"
texto[2] = "textos/economia.html"
texto[3] = "textos/tecnologia.html"
texto[4] = "textos/nasa.html"

randomizar = Math.floor(Math.random() * texto.length)
let ra = texto[randomizar]

let mostrar = `<iframe src="${ra}"></iframe>`
document.getElementById("iframeR").innerHTML= mostrar

let intervalo;
let s = 0;
let m = 0;
function tempo(op) {
if (op == 1) {
  document.getElementById('parar').style.display = "block";

}


intervalo = window.setInterval(function() {
  if (s == 60) { m++; s = 0; }
  if (m == 60) { h++; s = 0; m = 0; }

  if (s < 10) document.getElementById("segundo").innerHTML = "0" + s + "s"; else document.getElementById("segundo").innerHTML = s + "s";
  if (m < 10) document.getElementById("minuto").innerHTML = "0" + m + "m"; else document.getElementById("minuto").innerHTML = m + "m";
  s++;
},1000);

}

function parar() {
  window.clearInterval(intervalo);
  let mi = document.getElementById("minuto").innerHTML
  localStorage.setItem('chave', mi);
  let ch = localStorage.getItem('chave')

  localStorage.setItem('chaveE', m)
  let cE = localStorage.getItem('chaveE')

  if(cE <= 0){

    let styles = `width:300px;height:250px;`
    let btn =`background:black;
      color:  white;
      border: 3px solid #7D26CD;
      bottom: 5px;
      width: 100px;
      height:40px;
      font-weight: bold;`

    document.write(`
        <button style="${btn}" type="submit" onclick="window.location.href='index.html'">Inicio</button>
        <button style="${btn}" type="submit" onclick="window.location.href='testeppm.html'">Refazer teste</button>
        <div style="${styles}"><img width="100%" src="../assets/chato.png"></div>

    `)

  }else{

    let refe = localStorage.getItem('noticia')

    let re1 = refe/cE;

    let res = Math.trunc(re1)

    let redeinfo =`Resultado do teste PPM, Seu Tempo: ${ch}, Palavras: ${refe}, PPM: ${res}.`

    let divs = `<button type="submit" onclick="window.location.href='testeppm.html'">refazer test</button> `
    let div2 = `<button class="btn" type="submit" onclick="window.location.href='index.html'">Inicio</button>`
    let rede = `<span class="rede">
          <a href="https://www.facebook.com/sharer/sharer.php?u=https://teste-ppm-leitura.netlify.com/index.html&t=${redeinfo}"><img width="100%" src="assets/face.png"></a>
            <a href="https://twitter.com/intent/tweet?url=https://teste-ppm-leitura.netlify.com&text=${redeinfo}"><img width="100%" src="assets/twitter.png"></a>
          </span>`


    let ine = `
      <div class="container2">
        <h1 class="h1">Leitura orgânica</h1>
        <div class="card2">
          <img src="./assets/Logo - Branca.png">
          <h1 class"h1">Resultado do teste de Leitura (PPM)</h1>
          <p><span>Tempo: ${ch}</span><span> Palavras: ${refe}</span><strong> (PPM): ${res}</strong></p>

          ${rede}
          <div class="button">${divs}  ${div2}</div>
        </div>
      </div>

      `
      document.title = 'Resultado do teste PPM'
      let resultado = document.getElementById("resultado").innerHTML=ine

  }

}

window.onload=tempo;
