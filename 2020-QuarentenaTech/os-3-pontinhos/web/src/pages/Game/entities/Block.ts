import P5 from 'p5';

interface BlockData {
  x?: number;
  y?: number;
  color: string;
}

class Block {
  private x: number;

  private y: number;

  private size: number;

  private color: string;

  constructor({ x = 0, y = 0, color }: BlockData) {
    this.x = x;
    this.y = y;

    this.size = 40;
    this.color = color;
  }

  moveHorizontally(direction = 1): void {
    this.x += direction * this.size;
  }

  gravity(): void {
    this.y += this.size;
  }

  show(p: P5): void {
    p.fill(this.color);
    p.rect(this.x, this.y, this.size, this.size);
  }
}

export default Block;
