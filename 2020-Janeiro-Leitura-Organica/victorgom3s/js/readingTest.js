import textos from "./textos";
import Modal from "./Modal";

let indexAleatorio = Math.floor(Math.random() * 4);
const textoAtual = textos[indexAleatorio];
const screen = document.querySelector("#texto-kindle");
const modal = new Modal(".modal");
/*
  0 = Iniciar
  1 = Finalizar
  2 = Repetir
 */
let testeState = 0;
let horaInicio;

const checkScrollToTheEnd = btn => {
  screen.onscroll = () => {
    if (screen.scrollTop == screen.scrollTopMax) {
      btn.removeAttribute("disabled");
      return true;
    }
  };
};

const toggleButtonAction = e => {
  console.log(testeState);
  switch (testeState) {
    case 0:
      iniciarTeste(e);
      break;
    case 1:
      finalizarTeste(e, horaInicio);
      break;
    case 2:
      iniciarTeste(e);
      break;
  }
};

const finalizarTeste = e => {
  const horaFim = Math.floor(Date.now() / 1000);
  const tempoFinal = (horaFim - horaInicio) / 60;

  if (tempoFinal == 0) {
    modal.showModal();
    modal.setModalText(
      "Você deve completar a leitura do texto proposto antes de finalizar o teste."
    );
  } else {
    testeState = 2;
    let qtdPalavras = parseInt(textoAtual.palavras, 10).toFixed(1);
    console.log(qtdPalavras, tempoFinal);
    const ppm = qtdPalavras / tempoFinal;
    modal.showModal(true);
    modal.setModalText(`Parabéns. Seu PPM atual é de ${ppm}`);

    e.target.innerText = "Repetir";
  }
};

const iniciarTeste = e => {
  testeState = 1;

  horaInicio = Math.floor(Date.now() / 1000);
  e.target.innerText = "Finalizar";
  e.target.setAttribute("disabled", "");

  /* Ao scrollar a tela do kindle, verifica se o usuario já scrolou até o fim */
  checkScrollToTheEnd(e.target);
};

(function loadText() {
  screen.innerText = textoAtual.texto;

  const btnIniciar = document.getElementById("iniciarTeste");
  btnIniciar.addEventListener("click", toggleButtonAction);
})();
