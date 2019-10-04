'use strtic';

//Toggle-Menu 
document.getElementById('toggle-menu').addEventListener('click', function() {
  document.getElementById('toggle-content').classList.toggle('hidden');
})

//Scroll-Effect
window.addEventListener('scroll', function() {
  if(window.scrollY > 30) {
    document.getElementById('download-scroll').classList.add('sm:text-light', 'sm:bg-primary', 'transition');
    document.getElementById('header-scroll').classList.add('sm:shadow-primary', 'transition');
  } else {
    document.getElementById('download-scroll').classList.remove('sm:bg-primary', 'sm:text-light');
    document.getElementById('header-scroll').classList.remove('sm:shadow-primary');
  }
})