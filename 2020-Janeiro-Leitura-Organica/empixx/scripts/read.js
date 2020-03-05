const ready = parseInt(window.localStorage.getItem("ready"));

if (!ready) {
  window.location.href = "index.html";
}
window.localStorage.setItem("ready", 0);

const textarea = document.querySelector(".text");
const regressive = document.querySelector(".regressive");
const container = document.querySelector(".container");

const selectedText = window.localStorage.getItem("text");

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
function startStopwatch() {
  let minutes = 0;
  let seconds = 1;

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
