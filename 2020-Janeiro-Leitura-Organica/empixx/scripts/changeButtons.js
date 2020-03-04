let singleButton = document.querySelector(".single-button");
let buttonGroup = document.querySelector(".button-group");

singleButton.addEventListener("click", () => {
  buttonGroup.style.display = "block";
  singleButton.style.display = "none";
});
