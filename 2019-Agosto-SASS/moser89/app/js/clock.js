const clock = document.getElementById('clock');

setInterval(function () {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  if (hours < 10) {
    h = ('0' + hours);
  } else  {
    h = ('' + hours);
  }

  if (minutes < 10) {
    m = (':0' + minutes);
  } else  {
    m = (':' + minutes);
  }

  clock.innerHTML = (h + m);
}); 