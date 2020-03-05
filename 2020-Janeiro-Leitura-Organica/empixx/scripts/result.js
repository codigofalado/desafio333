let result = document.querySelector(".result");
let repeat = document.querySelector(".repeat");
let spansInfo = document.querySelectorAll(".info-result p span");

let twitterLink = document.getElementById("twitter");
let facebookLink = document.getElementById("facebook");
let linkedinLink = document.getElementById("linkedin");
let whatsappLink = document.getElementById("whatsapp");
let emailLink = document.getElementById("email");

let ppm = window.localStorage.getItem("ppm");
let words = window.localStorage.getItem("words");
let minutes = window.localStorage.getItem("minutes");
let seconds = window.localStorage.getItem("seconds");

let time = minutes
  ? `${String(minutes).length == 1 ? "0" + minutes : minutes}:${
      String(seconds).length == 1 ? "0" + seconds : seconds
    }`
  : "00:00";

result.innerHTML = ppm ? `<div>${ppm}</div>` : "0";
spansInfo[0].innerHTML = words ? words : "0";
spansInfo[1].innerHTML = time ? time : "0";

let siteUrl = "https://leituraorganica.com.br";
let textToShare = `Acabei de realizar um teste de PPM! meu resultado foi de ${ppm}!`;

twitterLink.href = `https://twitter.com/intent/tweet?url=${siteUrl}&text=${textToShare}`;
facebookLink.href = `https://www.facebook.com/share.php?u=${siteUrl}&quote=${textToShare}`;
linkedinLink.href = `https://www.linkedin.com/shareArticle?mini=true&url=${siteUrl}&title=&summary=${textToShare}&source=`;
whatsappLink.href = `https://api.whatsapp.com/send?text=${textToShare} ${siteUrl}`;
emailLink.href = `mailto:?subject=&body=${siteUrl} ${textToShare}`;

repeat.addEventListener("click", () => {
  window.location.href = "configure.html";
});
