class Block {
  constructor({ x = 0, y = 0, color }) {
    this.x = x;
    this.y = y;
    
    this.size = BLOCK_SIZE;
    this.color = color;
  }

  moveHorizontally(direction = 1) {
    this.x += direction * this.size;
  }

  gravity() {
    this.y += this.size;
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }
}
