let text = document.querySelector(".text");
let stopwatch = document.querySelector(".stopwatch");

function setConfiguration() {
  const font = window.localStorage.getItem("font");
  const size = window.localStorage.getItem("size");
  const stopwatchShow = window.localStorage.getItem("stopwatch");
  const theme = window.localStorage.getItem("theme");
  const logo = document.querySelector(".logo a img");
  const root = document.documentElement;

  text.style.fontFamily = font ? font : "Montserrat";
  text.style.fontSize = size ? size : "16px";
  stopwatch.style.opacity = stopwatchShow ? stopwatchShow : "1";

  if (theme == 0) {
    root.style.setProperty("--bg", "#2C3E50");
    root.style.setProperty("--detail", "#f6f6f6");
    logo.src = "./assets/logo-white.png";
  } else {
    root.style.setProperty("--bg", "#f6f6f6");
    root.style.setProperty("--detail", "#222");
    logo.src = "./assets/logo-black.png";
  }
}

window.load = setConfiguration();
