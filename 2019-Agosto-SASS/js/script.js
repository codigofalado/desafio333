const clock = document.getElementById('clock');

let cont = 0;

function time(elem) {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();

  h = h.toString().length == 1 ? '0' + h : h;
  m = m.toString().length == 1 ? '0' + m : m;

  cont % 2 == 0 ? (elem.innerHTML = `${h}:${m}`) : (elem.innerHTML = `${h} ${m}`);

  cont++;
}

setInterval(() => {
  time(clock);
}, 1000);
