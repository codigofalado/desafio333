const data = new Date();
const hora = data.getHours();
const minuto = data.getMinutes();

const horas = document.querySelector('.news');

const horasElement = document.createElement('div');
const horasTexto = document.createTextNode(`${hora}:${minuto}`);
horasElement.appendChild(horasTexto);
horas.appendChild(horasElement);