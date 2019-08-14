const clock = document.getElementById('clock');

function time(elem) {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();

  h = h.toString().length == 1 ? '0' + h : h;
  m = m.toString().length == 1 ? '0' + m : m;

  elem.innerHTML = `${h}:${m}`;

  // console.log(`${h}:${m}`);
}

setInterval(() => {
  time(clock);
}, 1000);
