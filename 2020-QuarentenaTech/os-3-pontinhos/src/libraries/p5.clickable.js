//        _____      _ _      _         _     _
//       |  ___|    | (_)    | |       | |   | |
//  _ __ |___ \  ___| |_  ___| | ____ _| |__ | | ___
// | '_ \    \ \/ __| | |/ __| |/ / _` | '_ \| |/ _ \
// | |_) /\__/ / (__| | | (__|   < (_| | |_) | |  __/
// | .__/\____(_)___|_|_|\___|_|\_\__,_|_.__/|_|\___|
// | | www.github.com/lartu/p5.clickable
// |_| created by Lartu, version 1.2

//Determines if the mouse was pressed on the previous frame
var cl_mouseWasPressed = false;
//Last hovered button
var cl_lastHovered = null;
//Last pressed button
var cl_lastClicked = null;
//All created buttons
var cl_clickables = [];

//This function is what makes the magic happen and should be ran after
//each draw cycle.
p5.prototype.runGUI = function () {
  for (i = 0; i < cl_clickables.length; ++i) {
    if (cl_lastHovered != cl_clickables[i]) cl_clickables[i].onOutside();
  }
  if (cl_lastHovered != null) {
    if (cl_lastClicked != cl_lastHovered) {
      cl_lastHovered.onHover();
    }
  }
  if (!cl_mouseWasPressed && cl_lastClicked != null) {
    cl_lastClicked.onPress();
  }
  if (cl_mouseWasPressed && !menu.mouseIsPressed && cl_lastClicked != null) {
    if (cl_lastClicked == cl_lastHovered) {
      cl_lastClicked.onRelease();
    }
    cl_lastClicked = null;
  }
  cl_lastHovered = null;
  cl_mouseWasPressed = menu.mouseIsPressed;
};

p5.prototype.registerMethod("post", p5.prototype.runGUI);

//Button Class
function Clickable({
  x = 0,
  y = 0,
  text = "Press me",
  width = 200,
  height = 100,
  textSize = 12,
  textFont = "sans-serif",
  cornerRadius = 10,
  color = "#FFFFFF",
  textColor = "#000000",
  strokeWeight = 2,
  img,
}) {
  this.x = x || 0; //X position of the clickable
  this.y = y || 0; //Y position of the clickable
  this.width = width; //Width of the clickable
  this.height = height; //Height of the clickable
  this.color = color; //Background color of the clickable
  this.cornerRadius = cornerRadius; //Corner radius of the clickable
  this.strokeWeight = strokeWeight; //Stroke width of the clickable
  this.stroke = "#000000"; //Border color of the clickable
  this.text = text; //Text of the clickable
  this.textColor = textColor; //Color for the text shown
  this.textSize = textSize; //Size for the text shown
  this.textFont = textFont; //Font for the text shown
  this.img = img;

  this.onHover = function () {
    //This function is ran when the clickable is hovered but not
    //pressed.
  };

  this.onOutside = function () {
    //This function is ran when the clickable is NOT hovered.
  };

  this.onPress = function () {
    //This function is ran when the clickable is pressed.
  };

  this.onRelease = function () {
    //This funcion is ran when the cursor was pressed and then
    //released inside the clickable. If it was pressed inside and
    //then released outside this won't work.
  };

  this.locate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  this.resize = function (w, h) {
    this.width = w;
    this.height = h;
  };

  this.draw = function () {
    if (this.img != null) {
      image(this.img, this.x, this.y, this.width, this.height);
    } else {
      menu.fill(this.color);
      menu.stroke(this.stroke);
      menu.strokeWeight(this.strokeWeight);
      menu.rect(this.x, this.y, this.width, this.height, this.cornerRadius);
      menu.fill(this.textColor);
      menu.noStroke();
      menu.textAlign(menu.CENTER, menu.CENTER);
      menu.textSize(this.textSize);
      menu.textFont(this.textFont);
      menu.text(this.text, this.x + 1, this.y + 1, this.width, this.height);
    }

    if (
      menu.mouseX >= this.x &&
      menu.mouseY >= this.y &&
      menu.mouseX < this.x + this.width &&
      menu.mouseY < this.y + this.height
    ) {
      cl_lastHovered = this;
      if (menu.mouseIsPressed && !cl_mouseWasPressed) cl_lastClicked = this;
    }
  };

  cl_clickables.push(this);
}
