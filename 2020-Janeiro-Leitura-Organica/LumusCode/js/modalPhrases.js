const url = "https://api-frases.herokuapp.com/frase";

const xhr = new XMLHttpRequest();
xhr.open("GET", url, false);
xhr.send();

const frases = JSON.parse(xhr.responseText);

const listItem1 = document.querySelector("ul .listitem1");
const listItem2 = document.querySelector("ul .listitem2");
const listItem3 = document.querySelector("ul .listitem3");

const paragraph1 = document.querySelector(".paragraph1");
const paragraph2 = document.querySelector(".paragraph2");
const paragraph3 = document.querySelector(".paragraph3");

const modalBody = document.querySelector("#modalBody");
const modalTtile = document.querySelector(".modal-title");
const phrasesEinstein = `${frases.einstein1}`;
const phrasesHarryPotter = `${frases.harryPotter1}`;
const phrasesLordOfTheRings = `${frases.lordOfTheRings1}`;

const btnSopPhrases = document.querySelector("#btnSopPhrases");
const textPPM = document.querySelector("#textPPM");
const divHidden = document.querySelector(".text-ppm");

const btnClearPhrasesEinstein = document.querySelector(".btnClearPhrasesEinstein");
const btnClearPhrasesHarryPotter = document.querySelector(".btnClearPhrasesHarryPotter");
const btnClearPhrasesLordOfTheRings = document.querySelector(".btnClearPhrasesLordOfTheRings");

const btnRemakeTest = document.querySelector(".btn-remake-test");


function reaload() {

  const closeReload = document.querySelector(".closeReload");

  closeReload.addEventListener("click", () => {
    location.reload();
  });
}

listItem1.addEventListener("click", () => {
  listItem1.setAttribute("data-target", "#modalPhrases");
  modalTtile.textContent = "Albert Einstein";

  console.log(phrasesEinstein.split(" ").filter(words => words && words).length);

  paragraph1.textContent = phrasesEinstein;
  modalBody.classList.add("modalBodyImage1");

  btnClearPhrasesEinstein.addEventListener("click", () => {

    const chronometerPhrasesValue = parseFloat(chronometerPhrases.value);

    if (chronometerPhrasesValue) {
      const phrases = phrasesEinstein.split(" ").filter(words => words && words).length
      const calc = phrases / chronometerPhrasesValue;

      textPPM.textContent = calc.toFixed(2);
      divHidden.classList.remove("text-ppm");

    }

  });

  btnRemakeTest.addEventListener("click", () => {

    const phrasesEinstein2 = `${frases.einstein2}`;
    paragraph1.textContent = phrasesEinstein2;

    divHidden.classList.add("text-ppm");

    chronometerPhrases.value = "";

  });

  reaload();

});

listItem2.addEventListener("click", () => {

  listItem2.setAttribute("data-target", "#modalPhrases");
  modalTtile.textContent = "Harry Potter";

  paragraph2.textContent = phrasesHarryPotter;
  modalBody.classList.add("modalBodyImage2");

  btnClearPhrasesHarryPotter.addEventListener("click", () => {

    const chronometerPhrasesValue = parseFloat(chronometerPhrases.value);

    if (chronometerPhrasesValue) {
      const phrases = phrasesHarryPotter.split(" ").filter(words => words && words).length
      const calc = phrases / chronometerPhrasesValue;

      textPPM.textContent = calc.toFixed(2);

      divHidden.classList.remove("text-ppm");

    }

  });

  btnRemakeTest.addEventListener("click", () => {

    const phrasesHarryPotter2 = `${frases.harryPotter2}`;

    paragraph2.textContent = phrasesHarryPotter2;

    divHidden.classList.add("text-ppm");

    chronometerPhrases.value = "";
  });

  reaload();

});

listItem3.addEventListener("click", () => {
  listItem3.setAttribute("data-target", "#modalPhrases");
  modalTtile.textContent = "Senhor dos Aneis";

  paragraph3.textContent = phrasesLordOfTheRings;
  modalBody.classList.add("modalBodyImage3");

  btnClearPhrasesLordOfTheRings.addEventListener("click", () => {

    const chronometerPhrasesValue = parseFloat(chronometerPhrases.value);

    if (chronometerPhrasesValue) {
      const phrases = phrasesLordOfTheRings.split(" ").filter(words => words && words).length
      const calc = phrases / chronometerPhrasesValue;

      textPPM.textContent = calc.toFixed(2);

      divHidden.classList.remove("text-ppm");

    }

  });

  btnRemakeTest.addEventListener("click", () => {

    const phrasesLordOfTheRings2 = `${frases.lordOfTheRings2}`;

    paragraph3.textContent = phrasesLordOfTheRings2;

    divHidden.classList.add("text-ppm");

    chronometerPhrases.value = "";
  });

  reaload();

});


btnClearPhrases.onclick = () => btnSopPhrases.textContent = "Finalizar";

function chronometerModal() {
  const chronometerPhrases = document.querySelector("#chronometerPhrases");
  const btnStartPhrases = document.querySelector("#btnStartPhrases");
  const btnSopPhrases = document.querySelector("#btnSopPhrases");
  const btnClearPhrases = document.querySelector("#btnClearPhrases");

  btnStartPhrases.addEventListener("click", init);
  btnSopPhrases.addEventListener("click", pause);
  btnClearPhrases.addEventListener("click", clear);

  let interval = null;
  let millisecondStart = 0;
  let millisecondPause = 0;
  let msTempoDecorrido = 0;
  let running = false;

  function init() {
    if (running) return;
    stop();
    millisecondStart = Date.now();
    startChronometer();
    running = true;
  }

  function pause() {
    if (!chronometerPhrases.value) return;
    if (running) {
      clearInterval(interval);
      millisecondPause = Date.now();
      msTempoDecorrido += (millisecondPause - millisecondStart);
    } else {
      millisecondStart = Date.now();
      startChronometer(msTempoDecorrido);
    }
    running = !running;
  }

  function clear() {
    millisecondPause = 0;
    millisecondStart = 0;
    msTempoDecorrido = 0;
    running = false;
    clearInterval(interval);
    chronometerPhrases.value = '';
  }

  function startChronometer(tempoDecorrido) {
    let _ms = tempoDecorrido || 0;
    interval = setInterval(function () {
      let msAgora = Date.now();
      let diferenca = msAgora - millisecondStart;
      chronometerPhrases.value = formatMillisecons(diferenca + _ms);
    }, 100)
  }

  function formatMillisecons(ms) {
    const minute = 60 * 1000;
    if (ms < 1) {
      return ms;
    } else if (ms < minute) {
      let s = ms / 1000;
      s = parseInt(s);
      let c = ms - (s * 1000);
      return s;
    } else {
      let m = ms / minute;
      m = parseInt(m);
      return m + ":" + formatMillisecons(ms - m * minute);
    }

  }
};

chronometerModal();
