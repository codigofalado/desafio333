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

function channelChange() {
  const secOne = document.getElementById('channel-one');
  const secTwo = document.getElementById('channel-two');
  const video = document.getElementById('video');

  const styleOne = window.getComputedStyle(secOne);
  const styleTwo = window.getComputedStyle(secTwo);

  if (styleOne.display == 'none') {
    secOne.style.display = 'flex';
    secTwo.style.display = 'none';
    video.pause();
  } else if (styleTwo.display == 'none') {
    secTwo.style.display = 'flex';
    secOne.style.display = 'none';
    video.play();
  } else {
    secOne.style.display = 'flex';
    secTwo.style.display = 'none';
  }
}
