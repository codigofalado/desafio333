import P5 from 'p5';

import { KEYS, BLOCK_SIZE } from '../../../utils/constants';
import Block from './Block';

interface CreatePiace {
  shape: number[][];
  color: string;
  width: number;
  height: number;
}

interface Moviments {
  [key: number]: () => void;
}

type LineOfBlocks = (Block | null)[];
type Blocks = LineOfBlocks[];

interface ForBlockCbData {
  block: Block | null;
  line: LineOfBlocks;
  index: number;
  lineIndex: number;
}

class Piece {
  private color: string;

  private blocks: Blocks;

  moviments: Moviments;

  x: number;

  y: number;

  width: number;

  height: number;

  constructor(
    private canvas: P5,
    { shape, color, width, height }: CreatePiace,
  ) {
    this.x = this.canvas.width / 2 - BLOCK_SIZE;
    this.y = -2 * BLOCK_SIZE;

    this.width = width;
    this.height = height;

    this.color = color || this.randomColor();
    this.blocks = this.initBlocks(shape);

    this.moviments = {
      [canvas.LEFT_ARROW]: () => {
        this.moveHorizontally(-1);
      },
      [canvas.RIGHT_ARROW]: () => {
        this.moveHorizontally();
      },
      [canvas.UP_ARROW]: () => {
        this.rotateClockwise();
      },
      [KEYS.A]: () => {
        this.rotateClockwise();
      },
      [KEYS.S]: () => {
        this.rotateAntiClockwise();
      },
    };
  }

  private randomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  // TODO: Refactor: use map function
  private initBlocks(model: number[][]): Blocks {
    const blocks: Blocks = [];

    model.forEach((line, yIndex) => {
      const blockLine: LineOfBlocks = [];

      line.forEach((item, xIndex) => {
        const block = item
          ? new Block({
              x: this.x + xIndex * BLOCK_SIZE,
              y: this.y + yIndex * BLOCK_SIZE,
              color: this.color,
            })
          : null;

        blockLine.push(block);
      });

      blocks.push(blockLine);
    });

    return blocks;
  }

  updateBlocksPosition(): void {
    this.forBlock(({ block, index, lineIndex }) => {
      const newX = this.x + index * BLOCK_SIZE;
      const newY = this.y + lineIndex * BLOCK_SIZE;

      block?.setPosition(newX, newY);
    });
  }

  forBlock(callback: (data: ForBlockCbData) => void, onlyNotNull = true): void {
    this.blocks.forEach((line, lineIndex) =>
      line.forEach((block, index) => {
        (!onlyNotNull || block) && callback({ block, index, line, lineIndex });
      }),
    );
  }

  /**
   * direction = 1  -> right
   * direction = -1 -> left
   */
  moveHorizontally(direction = 1): void {
    if (this.checkSideEdges(direction)) {
      return;
    }

    this.x += direction * BLOCK_SIZE;

    this.forBlock(({ block }) => {
      block?.moveHorizontally(direction);
    });
  }

  dropTo(yPosition: number): void {
    const y = (yPosition - this.height) * BLOCK_SIZE;

    this.y = y;
    this.updateBlocksPosition();
  }

  gravity(): void {
    this.y += BLOCK_SIZE;
    this.forBlock(({ block }) => block?.gravity());
  }

  rotateClockwise(): void {
    [this.height] = [this.width, (this.width = this.height)];

    const { length } = this.blocks[0];
    const newMatrix: Blocks = Array.from({ length }).map(() => []);

    this.forBlock(({ block, index }) => newMatrix[index].unshift(block), false);

    this.blocks = newMatrix;
    this.updateBlocksPosition();

    this.checkPieceInBoard();
  }

  // TODO: For refactor later
  rotateAntiClockwise(): void {
    for (let i = 0; i < 3; i += 1) {
      this.rotateClockwise();
    }
  }

  checkSideEdges(direction: number): boolean {
    const leftEdge = direction === -1 && this.x === 0;

    const rightEdge =
      direction === 1 && this.x + this.width * BLOCK_SIZE === this.canvas.width;

    return leftEdge || rightEdge;
  }

  // TODO: For refactor later
  checkPieceInBoard(): void {
    if (this.x + this.width * BLOCK_SIZE > this.canvas.width) {
      this.moveHorizontally(-1);
      if (this.x + this.width * BLOCK_SIZE > this.canvas.width) {
        this.moveHorizontally(-1);
        if (this.x + this.width * BLOCK_SIZE > this.canvas.width) {
          this.moveHorizontally(-1);
        }
      }
    }
  }

  checkBottomEdge(): boolean {
    return this.y + this.height * BLOCK_SIZE === this.canvas.height;
  }

  show(): void {
    this.forBlock(({ block }) => block?.show(this.canvas));

    this.canvas.circle(this.x, this.y, 10);
    this.canvas.circle(this.x + this.width * BLOCK_SIZE, this.y, 10);
    this.canvas.circle(this.x, this.y + this.height * BLOCK_SIZE, 10);
    this.canvas.circle(
      this.x + this.width * BLOCK_SIZE,
      this.y + this.height * BLOCK_SIZE,
      10,
    );
  }
}

export default Piece;
