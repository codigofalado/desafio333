var scrollpos = window.scrollY;
var header = document.getElementById('header');
var navcontent = document.getElementById('nav-content');
var navaction = document.getElementById('navAction');
var logo = document.getElementById('logo');
var btnDown = document.getElementById('download');
var toToggle = document.querySelectorAll('.toggleColour');

document.addEventListener('scroll', function() {
	/*Apply classes for slide in bar*/
	scrollpos = window.scrollY;

	if (scrollpos > 100) {
		header.classList.add('fixed');
		header.classList.add('shadow');
		logo.classList.add('md:w-32');
		logo.classList.remove('md:w-40');
		logo.classList.remove('lg:w-40');
		btnDown.classList.add('bg-pink-500');
		btnDown.classList.add('text-white');
		btnDown.classList.add('hover:text-pink-500');
		btnDown.classList.add('hover:bg-white');
		btnDown.classList.remove('hover:bg-pink-500');
		btnDown.classList.remove('hover:text-white');
		btnDown.classList.remove('text-pink-500');
	} else {
		header.classList.remove('fixed');
		header.classList.remove('shadow');
		logo.classList.add('md:w-40');
		logo.classList.add('lg:w-40');
		logo.classList.remove('md:w-32');
		btnDown.classList.remove('bg-pink-500');
		btnDown.classList.remove('text-white');
		btnDown.classList.remove('hover:text-pink-500');
		btnDown.classList.remove('hover:bg-white');
		btnDown.classList.add('hover:bg-pink-500');
		btnDown.classList.add('hover:text-white');
		btnDown.classList.add('text-pink-500');
	}
});

/*Toggle dropdown list*/

var navMenuDiv = document.getElementById('nav-content');
var navMenu = document.getElementById('nav-toggle');

document.onclick = check;

function check(e) {
	var target = (e && e.target) || (event && event.srcElement);

	//Nav Menu
	if (!checkParent(target, navMenuDiv)) {
		// click NOT on the menu
		if (checkParent(target, navMenu)) {
			// click on the link
			if (navMenuDiv.classList.contains('hidden')) {
				navMenuDiv.classList.remove('hidden');
			} else {
				navMenuDiv.classList.add('hidden');
			}
		} else {
			// click both outside link and outside menu, hide menu
			navMenuDiv.classList.add('hidden');
		}
	}
}

function checkParent(t, elm) {
	while (t.parentNode) {
		if (t == elm) {
			return true;
		}
		t = t.parentNode;
	}
	return false;
}
