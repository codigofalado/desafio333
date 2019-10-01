'use strtic';

//Toggle-Menu 
const menu = document.getElementById('toggle-menu');
const content = document.getElementById('toggle-content');
menu.addEventListener('click', function(){
  content.classList.toggle('hidden');
})


// const width = window.innerWidth;

// if(width >= 768) {
//   console.log('hello');
// }

window.addEventListener('scroll', function() {
  if(window.scrollY > 30) {
    document.getElementById('download-scroll').classList.add('sm:text-light', 'sm:bg-primary', 'transition');
  } else {
    document.getElementById('download-scroll').classList.remove('sm:bg-primary', 'sm:text-light');
  }
})