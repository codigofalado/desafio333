class Block {
  constructor({ x = 0, y = 0, size = blockSize, color = "#fff" }) {
    this.x = x * size;
    this.y = y * size;
    
    this.size = size;
    this.color = color;
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.x -= blockSize;
    this.y -= blockSize;
  }
}
