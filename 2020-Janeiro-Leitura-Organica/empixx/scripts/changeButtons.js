const singleButton = document.querySelector(".single-button");
const buttonGroup = document.querySelector(".button-group");

singleButton.addEventListener("click", () => {
  buttonGroup.style.display = "block";
  singleButton.style.display = "none";
});
