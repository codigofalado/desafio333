(function(){
    function retornaHora() {
        const relogioPag = new Date();
        const horas = relogioPag.getHours();
        const minutos = relogioPag.getMinutes();

        if(horas < 10){
            h = ('0' + horas);
        }else{
            h = ('' + horas);
        }

        if(minutos < 10) {
            m = (':0' + minutos);
        }else{
            m = (':' + minutos);
        }

        return h + m;
    }


    function inicializaRelogio() {
        relogio = document.getElementById('relogio');
        relogio.innerHTML = retornaHora();
    }

    window.addEventListener('load', inicializaRelogio);
})();


var imageCount = 0;
var currentImage = 0;
var images = new Array();
 
images[0] = 'assets/img/noti-01.jpg';
images[1] = 'assets/img/noti-02.jpg';
images[2] = 'assets/img/noti-03.jpg';
 
var preLoadImages = new Array();
for (var i = 0; i < images.length; i++)
{
   if (images[i] == "")
      break;
 
   preLoadImages[i] = new Image();
   preLoadImages[i].src = images[i];
   imageCount++;
}
 
function startSlideShow(){
   if (document.body && imageCount > 0)
   {
      document.getElementById("img-noticia").src = ""+images[currentImage]+"";

      AOS.init();
 
      currentImage = currentImage + 1;
      if (currentImage > (imageCount-1))
      { 
         currentImage = 0;
      }
      setTimeout('startSlideShow()', 10000);
   }
}

startSlideShow();


AOS.init();