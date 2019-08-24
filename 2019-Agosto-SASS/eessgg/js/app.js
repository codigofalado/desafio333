const footerClock = document.querySelector('.footer-clock');

setInterval(function() {

  const data = new Date();
  const hour = data.getHours();
  const min = data.getMinutes();

  footerClock.innerHTML = hour + ":" + min;
}, 1000);

