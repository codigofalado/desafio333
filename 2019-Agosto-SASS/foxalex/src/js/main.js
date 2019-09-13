// Normalizing GetUserMedia
navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

// Init Modules
const leftMenu = new LeftMenu();
const manageContent = new ManageContent();
