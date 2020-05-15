class Block {
  constructor({ x = 0, y = 0, size = BLOCK_SIZE, color = "#fff" } = {}) {
    this.x = x;
    this.y = y;
    
    this.size = size;
    this.color = color;
  }

  moveHorizontally(direction = 1) {
    this.x += direction * BLOCK_SIZE;
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.y += this.size;
  }
}
