const previousButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");
const section = document.querySelectorAll(".section");

let slideIndex = 0;
let toNextSlide = true;

nextButton.addEventListener("click", () => {
  nextSlide();
  handlePreviousButton();
});

previousButton.addEventListener("click", () => {
  previousSlide();
});

function nextSlide() {
  if (!toNextSlide) return;

  handleSlideDisplay(1);

  if (slideIndex == section.length - 1) {
    handleNextButton({
      name: "Continuar",
      toNextSlide: false,
      addClass: "green",
      removeClass: "blue",
      onclick: true
    });
  }
}

function previousSlide() {
  handleNextButton({
    name: "Próximo",
    toNextSlide: true,
    addClass: "blue",
    removeClass: "green",
    onclick: false
  });
  handleSlideDisplay(-1);
  handlePreviousButton();
}

function handleSlideDisplay(slide) {
  section[slideIndex].classList.remove("selected");
  slideIndex += slide;
  section[slideIndex].classList.add("selected");
}

function handleNextButton(params) {
  toNextSlide = params.toNextSlide;
  nextButton.innerText = params.name;

  if (slideIndex == section.length - 1) {
    nextButton.classList.toggle(params.addClass);
    nextButton.classList.toggle(params.removeClass);
  }

  if (params.onclick) {
    nextButton.setAttribute("onclick", "changePage()");
  } else {
    nextButton.removeAttribute("onclick");
  }
}

function handlePreviousButton() {
  previousButton.style.display = slideIndex == 0 ? "none" : "inline";
}

function changePage() {
  window.location = "/configure.html";
}