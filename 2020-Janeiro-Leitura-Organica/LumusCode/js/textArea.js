function calculatorCharacters() {

  const textArea = document.querySelector("#text-area");
  const span = document.querySelector("#span");
  const maxCharacters = document.querySelector("#max-characters");
  const maxValue = 0;
  const maxCharacter = 1000;

  maxCharacters.textContent = maxCharacter;

  span.textContent = maxValue;
  textArea.addEventListener("input", () => {

    textArea.value
      ?
      span.textContent = maxValue + textArea.value.split(" ").filter(word => word && word).length
      :
      span.textContent = maxValue;

  })
}

calculatorCharacters();