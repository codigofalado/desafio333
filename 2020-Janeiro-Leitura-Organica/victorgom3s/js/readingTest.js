import { textos } from "./textos.js";
let indexAleatorio = Math.floor(Math.random() * 4);
const textoAtual = textos[indexAleatorio];
const screen = document.querySelector("#texto-kindle");

const checkScrollToTheEnd = btn => {
  screen.onscroll = () => {
    if (screen.scrollTop == screen.scrollTopMax) {
      btn.removeAttribute("disabled");
      return true;
    }
  };
};

const finalizarTeste = (horaInicio, e) => {
  const horaFim = Math.floor(Date.now() / 1000);
  console.log(horaInicio, horaFim);

  const tempoFinal = Math.floor((horaFim - horaInicio) / 60);
  console.log(tempoFinal, +textoAtual.palavras);
  if (tempoFinal == 0) {
    alert(
      "Você deve completar a leitura do texto proposto antes de finalizar o teste."
    );
  } else {
    const ppm = +textoAtual.palavras / tempoFinal;
    alert(`Seu PPM atual é de ${ppm}`);
    e.target.innerText = "Repetir";
    e.target.addEventListener("click", iniciarTeste);
  }
};

const iniciarTeste = e => {
  const horaInicio = Math.floor(Date.now() / 1000);
  e.target.innerText = "Finalizar";
  e.target.removeEventListener("click", iniciarTeste);
  e.target.setAttribute("disabled", "");

  /* Ao scrollar a tela do kindle, verifica se o usuario já scrolou até o fim */
  checkScrollToTheEnd(e.target);

  e.target.addEventListener("click", finalizarTeste.bind(this, horaInicio));
};

(function loadText() {
  screen.innerText = textoAtual.texto;

  const btnIniciar = document.getElementById("iniciarTeste");
  btnIniciar.addEventListener("click", iniciarTeste);
})();
