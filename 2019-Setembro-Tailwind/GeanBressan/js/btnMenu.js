function myFunction() {
    var x = document.getElementById("menu").className;
    if (x === "hidden md:inline-flex") {
        document.getElementById("menu").className = 'w-3/5 inline-block';
    } else {
        document.getElementById("menu").className= 'hidden md:inline-flex';
    }
  }
