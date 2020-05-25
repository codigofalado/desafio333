class infoBox {
  constructor({ x, y, text1, text2 }) {
    this.x = x;
    this.y = y;
    this.text1 = text1;
    this.text2 = text2;
    this.width = menu.width * 0.8;
    this.height = 30;

    this.box1 = new Clickable({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      text: this.text1,
      cornerRadius: 0,
      color: "#545454",
      textColor: "#D2D2D2",
      strokeWeight: 0,
    });

    this.box2 = new Clickable({
      x: this.x,
      y: this.y + 30,
      width: this.width,
      height: this.height + 20,
      text: this.text2,
      cornerRadius: 0,
      color: "#D2D2D2",
      textColor: "#545454",
      strokeWeight: 0,
    });
  }

  show() {
    this.box1.draw();
    this.box2.draw();

    //menu.fill(210);
    //menu.rect(this.x, this.y, this.width, this.height);
    //menu.fill(21);
    //menu.textSize(24);
    //menu.text(`${this.text1}`, this.x + 50, this.y + 15);
    //menu.rect(this.x, this.y + this.height, this.width, this.height);
    //menu.fill(210);
    //menu.text(`${this.text2}`, this.x, this.y + 30);
  }
}
