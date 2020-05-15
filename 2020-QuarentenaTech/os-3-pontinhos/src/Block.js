class Block {
  constructor({ x = 0, y = 0, size = 1, color = "#fff" }) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }
}
