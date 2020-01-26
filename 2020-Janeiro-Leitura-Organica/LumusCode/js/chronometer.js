(function () {

  const chronometer = document.querySelector('#chronometer');
  const start = document.querySelector('#startButton');
  const pause = document.querySelector('#pauseButton');
  const clear = document.querySelector('#clearButton');

  const textAreaValue = document.querySelector("textarea");
  const spanAlert = document.querySelector("#text-alert");

  start.addEventListener('click', () => {

    if (textAreaValue.value.length < 600) {
      spanAlert.style.display = "block";
      setTimeout(() => {
        spanAlert.style.display = "none";
      }, 3000)

    } else {
      initialize();
    }
  });

  pause.addEventListener('click', () => {
    pauseChronometer();

    const numberWords = textAreaValue.value.length;
    const temp = parseFloat(chronometer.value);
  });
  clear.addEventListener('click', stop);

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
    var _ms = tempoDecorrido || 0;
    interval = setInterval(function () {
      var msAgora = Date.now();
      var diferenca = msAgora - millisecondStart;
      chronometer.value = formatMillisecons(diferenca + _ms);
    }, 100)
  }

  function formatMillisecons(ms) {
    const minute = 60 * 1000;
    if (ms < 1000) {
      return ms;
    } else if (ms < minute) {
      var s = ms / 1000;
      s = parseInt(s);
      var c = ms - (s * 1000);
      return s + ':' + c;
    } else {
      var m = ms / minute;
      m = parseInt(m);
      return m + ":" + formatMillisecons(ms - m * minute);
    }

  }
})();