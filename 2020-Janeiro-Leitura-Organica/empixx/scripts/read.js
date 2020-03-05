const ready = parseInt(window.localStorage.getItem("ready"));

if (!ready) {
  window.location.href = "index.html";
}
window.localStorage.setItem("ready", 0);

const textarea = document.querySelector(".text");
const regressive = document.querySelector(".regressive");
const container = document.querySelector(".container");
const finish = document.querySelector(".finish");

const selectedText = window.localStorage.getItem("text");
const wordsOfText = texts[selectedText].words;

textarea.innerHTML = texts[selectedText].text;

let i = 2;
const regressiveCount = setInterval(() => {
  if (i == 2) {
    regressive.children[0].children[0].classList.toggle("red");
    regressive.children[0].children[0].classList.toggle("yellow");
  }
  if (i == 1) {
    regressive.children[0].children[0].classList.toggle("yellow");
    regressive.children[0].children[0].classList.toggle("green");
  }
  if (i == 0) {
    clearInterval(regressiveCount);
    container.classList.toggle("blur");
    regressive.style.display = "none";
    startStopwatch();
    return;
  }

  regressive.children[0].children[0].innerHTML = i;
  i--;
}, 1000);

let timer;
let minutes = 0;
let seconds = 1;
function startStopwatch() {
  timer = setInterval(() => {
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }

    stopwatch.innerHTML = `<span>
      ${String(minutes).length == 1 ? "0" + minutes : minutes}:${
      String(seconds).length == 1 ? "0" + seconds : seconds
    }
    </span>`;

    seconds++;
  }, 1000);
}

finish.addEventListener("click", () => {
  clearInterval(timer);
  let timeInSeconds = minutes * 60 + seconds;
  let ppm = (wordsOfText / timeInSeconds) * 60;
  window.localStorage.setItem("minutes", minutes);
  window.localStorage.setItem("seconds", seconds);
  window.localStorage.setItem("words", wordsOfText);
  window.localStorage.setItem("ppm", Math.round(ppm));
  window.localStorage.setItem("pageResult", 1);
  window.location.href = "result.html";
});
