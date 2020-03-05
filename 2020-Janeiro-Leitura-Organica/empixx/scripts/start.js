const startButton = document.querySelector(".start");

startButton.addEventListener("click", () => {
  window.localStorage.setItem("text", getRandomNumber(texts.length - 1));
  window.localStorage.setItem("ready", 1);
  window.location.href = "textarea.html";
});

function getRandomNumber(max) {
  return Math.floor(Math.random() * (max - 0 + 1)) + 0;
}
