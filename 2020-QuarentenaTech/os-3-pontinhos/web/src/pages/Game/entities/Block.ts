import P5 from 'p5';

import { BLOCK_SIZE } from '../../../utils/constants';

interface BlockData {
  x?: number;
  y?: number;
  color: string;
}

class Block {
  private size: number;

  color: string;

  x: number;

  y: number;

  constructor({ x = 0, y = 0, color }: BlockData) {
    this.x = x;
    this.y = y;

    this.size = BLOCK_SIZE;
    this.color = color;
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  moveHorizontally(direction = 1): void {
    this.x += direction * this.size;
  }

  gravity(): void {
    this.y += this.size;
  }

  show(canvas: P5): void {
    canvas.fill(this.color);
    canvas.rect(this.x, this.y, this.size, this.size);
  }
}

export default Block;
