let loop;
let startTime = 0
    $(document).ready(function(){
        $("#iniciar").click(function(){
        let date = new Date();
        startTime = date.getTime();
        

        loop = setInterval(function(){
            let curDate = new Date();
            let curTime = curDate.getTime() - startTime;
            

            let s = parseInt((curTime/1000) % 60).toLocaleString('pt-br', {minimumIntegerDigits: 2, useGrouping: false});
            let m = parseInt(((curTime/1000) / 60) % 60).toLocaleString('pt-br',{minimumIntegerDigits: 2, useGrouping: false});
            let h = parseInt(((curTime/1000) / 60) / 60).toLocaleString('pt-br',{minimumIntegerDigits: 2, useGrouping: false});
            document.getElementById("hora").value = h;
            document.getElementById("minuto").value =  m;
            document.getElementById("segundo").value =  s;
        });
        $('#parar').click(function(){
            clearInterval(loop);
            let curDate = new Date();
            let curTime = curDate.getTime() -startTime;
            

            let ppm = parseInt(parseInt(curTime)/722);
            let resultado = (ppm/1000)/60;
            document.getElementById("resultado").value =  ppm;
            
                  
        });
    });
    
});













/* var intervalo;

function iniciarCronometro() {
    var s = 1;
    var m = 0;
    var h = 0;
    intervalo = window.setInterval(function(){
        if (s == 60){
            m++; s = 0;
        }
        if (m == 60){
            h++; s = 0;m = 0;
        }
        if ( h < 10) {document.getElementById("hora").value = "0" + h + "h";}
        else {document.getElementById("hora").value = h + "h";}
        if (s < 10) {document.getElementById("segundo").value = "0" + s + "s";}
        else {document.getElementById("segundo").value = s + "s";}
        if (m < 10) {document.getElementById("minuto").value = "0" + m + "m";}
        else {document.getElementById("minuto").value = m + "m";}
        s++

    }, 1000)
    
}

function pararCronometro(){
    window.clearInterval(intervalo);
} */