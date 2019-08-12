let $relogio = document.querySelector('.p2')

function getHour() {
    let data = new Date()
    let h = formata(data.getHours())
    let m = formata(data.getMinutes())
    let s = formata(data.getSeconds())
    
    return h + ":" + m + ":" + s
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
