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







