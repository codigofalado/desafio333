function calculatorCharacters() {

  const textArea = document.querySelector("#text-area");
  const maxCharacters = document.querySelector("#max-characters");
  const minCharacters = document.querySelector("#min-characters");
  const spanMaxCharacters = document.querySelector("#span");
  const spanMinCharacters = document.querySelector("#spanMinCharacters");
  const maxLenght = textArea.maxLength
  const minLenght = textArea.minLength

  maxCharacters.style.display = "block";
  minCharacters.style.display = "block";
  spanMaxCharacters.textContent = maxLenght;
  spanMinCharacters.textContent = minLenght;

  textArea.addEventListener("input", function () {
    const maxCharacter = this.value.length;
    const calculatorMin = minLenght - maxCharacter;
    const calculatorMax = maxLenght - maxCharacter;

    if (calculatorMin <= 0) {
      minCharacters.textContent = "Valor minímo de palavras atingido você já pode calcular sua velocidade de leitura";
      minCharacters.classList.add("text-success");
    } else {
      spanMinCharacters.textContent = calculatorMin;
    };

    if (calculatorMax <= 0) {
      maxCharacters.textContent = "Valor máximo de palavras atingido";
      maxCharacters.classList.add("text-danger");
    } else {
      spanMaxCharacters.textContent = calculatorMax;
    }
  });

}

calculatorCharacters();