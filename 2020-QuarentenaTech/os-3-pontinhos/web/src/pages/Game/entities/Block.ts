import P5 from 'p5';

import { BLOCK_SIZE } from '../../../utils/constants';

interface BlockData {
  x?: number;
  y?: number;
  color: string;
}

class Block {
  x: number;

  y: number;

  private size: number;

  private color: string;

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

  show(p: P5): void {
    p.fill(this.color);
    p.rect(this.x, this.y, this.size, this.size);
  }
}

export default Block;
