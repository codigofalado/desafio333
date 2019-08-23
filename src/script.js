let $relogio = document.querySelector('.new-hour')

 function getHour() {
    let data = new Date()
    let h = formata(data.getHours())
    let m = formata(data.getMinutes())
    
     return h + ":" + m
}

 function formata(t) {
    return t < 10 ? "0" + t : t
}

 function mostraRelogio(atual) {
    $relogio.textContent = atual
}

 mostraRelogio(getHour())
setInterval(() => {
    mostraRelogio(getHour())
}, 1000)


