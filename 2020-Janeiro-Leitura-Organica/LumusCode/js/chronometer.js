(function () {

  const chronometer = document.querySelector('#chronometer');
  const start = document.querySelector('#startButton');
  const pause = document.querySelector('#pauseButton');
  const clear = document.querySelector('#clearButton');
  const btnClose = document.querySelector("#btn-close");
  const btnContinue = document.querySelector("#btn-continue");

  const textAreaValue = document.querySelector("textarea");
  const spanAlert = document.querySelector("#text-alert");

  start.addEventListener('click', () => {

    if (textAreaValue.value.split(" ").length < 576) {
      spanAlert.style.display = "block";
      setTimeout(() => {
        spanAlert.style.display = "none";
      }, 3000)

    } else {
      initialize();
    }
  });

  pause.addEventListener('click', () => {
    if (!chronometer.value) {
      pause.removeAttribute("data-target");
    } else {
      pause.setAttribute("data-target", "#exampleModal");
    }

    pauseChronometer();
    const numberWords = textAreaValue.value.split(" ").length;
    const temp = parseFloat(chronometer.value);
    const calculate = numberWords / temp;

    const speedreadingSpeed = document.querySelector("#speedreading-speed");
    speedreadingSpeed.textContent = calculate.toFixed(2);
  });

  clear.addEventListener('click', stop);

  btnClose.addEventListener("click", stop);

  btnContinue.addEventListener("click", pauseChronometer);

  let interval = null;
  let millisecondStart = 0;
  let millisecondPause = 0;
  let msTempoDecorrido = 0;
  let running = false;

  function initialize() {
    if (running) return;
    stop();
    millisecondStart = Date.now();
    startChronometer();
    running = true;
  }

  function pauseChronometer() {
    if (!chronometer.value) return;
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

  function stop() {
    millisecondPause = 0;
    millisecondStart = 0;
    msTempoDecorrido = 0;
    running = false;
    clearInterval(interval);
    chronometer.value = '';
  }

  function startChronometer(tempoDecorrido) {
    let _ms = tempoDecorrido || 0;
    interval = setInterval(function () {
      let msAgora = Date.now();
      let diferenca = msAgora - millisecondStart;
      chronometer.value = formatMillisecons(diferenca + _ms);
    }, 100)
  }

  function formatMillisecons(ms) {
    const minute = 60 * 1000;
    if (ms < 1000) {
      return ms;
    } else if (ms < minute) {
      let s = ms / 1000;
      s = parseInt(s);
      let c = ms - (s * 1000);
      return s + ':' + c;
    } else {
      let m = ms / minute;
      m = parseInt(m);
      return m + ":" + formatMillisecons(ms - m * minute);
    }

  }
})();