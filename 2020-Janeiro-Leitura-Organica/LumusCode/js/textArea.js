function validateCharacters() {
  const textArea = document.querySelector("#text-area");
  const btnStart = document.querySelector(".start");
  const textAlert = document.querySelector(".text-alert");

  btnStart.addEventListener("click", () => {
    const maxCharacter = textArea.value.length;

    if (maxCharacter <= 600) {
      textAlert.textContent = "Valor mínimo de 600 caracteres"
    }
  });
}

validateCharacters();