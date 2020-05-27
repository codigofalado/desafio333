import P5 from 'p5';

import { KEYS, MODELS, BLOCK_SIZE, POINTS } from '../../../utils/constants';
import Block from './Block';
import Piece from './Piece';

interface Sizes {
  height: number;
  width: number;
}

interface Moviments {
  [key: number]: () => void;
}

type LineOfBlocks = (Block | null)[];
type Blocks = LineOfBlocks[];

class Board {
  private moviments: Moviments;

  private canvas: P5;

  private sizes: Sizes;

  private matrix: Blocks;

  private pieceStack: Piece[];

  private fistLineWithoutBlocks: number;

  nextPiece?: Piece;

  currentPiece?: Piece;

  constructor(canvas: P5, sizes: Sizes) {
    this.canvas = canvas;
    this.sizes = sizes;

    this.pieceStack = [];
    this.matrix = this.initMatrix();

    this.initPieceStack();

    this.getNextPiece();

    this.fistLineWithoutBlocks = 20;

    this.moviments = {
      [KEYS.D]: () => this.hardDrop(),
      // [KEYS.Q]: () => canvas.playPause(),
    };
  }

  private initLine(): null[] {
    return Array.from({ length: this.sizes.width }).map(() => null);
  }

  private initMatrix(): null[][] {
    return Array.from({ length: this.sizes.height }).map(() => this.initLine());
  }

  private initPieceStack(): void {
    this.pieceStack.push(new Piece(this.canvas, this.canvas.random(MODELS)));
    this.pieceStack.push(new Piece(this.canvas, this.canvas.random(MODELS)));
  }

  private getNextPiece(): void {
    [, this.nextPiece] = this.pieceStack;

    [this.currentPiece] = this.pieceStack.splice(0, 1);

    this.pieceStack.push(new Piece(this.canvas, this.canvas.random(MODELS)));

    this.fistLineWithoutBlocks = this.findFirstLineWithoutBlocks();
  }

  private addCurrentPiece(): void {
    this.currentPiece?.forBlock(({ block }) => {
      if (block) {
        const xIndex = block.x / BLOCK_SIZE;
        const yIndex = block.y / BLOCK_SIZE;

        this.matrix[yIndex][xIndex] = block;
      }
    });

    this.checkCompleteLines();
  }

  // TODO: Verify
  private isLineFilled(line: LineOfBlocks): boolean {
    // Check if at lest one no block on line,
    // if not, find return undefined = line is filled;
    return line.find((block) => !block) === undefined;
  }

  private findFirstLineWithoutBlocks(): number {
    if (this.currentPiece) {
      const { x, y, height, width } = this.currentPiece;

      const piecePosition = y / BLOCK_SIZE + height;

      const initialLine = piecePosition > 0 ? piecePosition : 0;
      const initialColumn = x / BLOCK_SIZE;

      for (let yIndex = initialLine; yIndex < this.matrix.length; yIndex += 1) {
        const line = this.matrix[yIndex].slice(
          initialColumn,
          initialColumn + width,
        );

        const findBlock = !!line.find((block) => block);

        if (findBlock) {
          return yIndex;
        }
      }
    }

    return this.sizes.height;
  }

  private hardDrop(): void {
    if (!this.checkEndGame()) {
      this.currentPiece?.dropTo(this.fistLineWithoutBlocks);

      this.addCurrentPiece();
      this.getNextPiece();
    }
  }

  // TODO: CHECK
  private checkCompleteLines(): void {
    const fullLineIndexes: number[] = [];

    this.matrix.forEach((line, index) => {
      if (this.isLineFilled(line)) {
        fullLineIndexes.push(index);
      }
    });

    const { length } = fullLineIndexes;
    this.addPoints(length - 1);

    if (length) {
      this.matrix.splice(fullLineIndexes[0], length);
      fullLineIndexes.forEach(() => this.matrix.unshift(this.initLine()));

      this.matrix.forEach((line, yIndex) =>
        line.forEach((block, xIndex) => {
          if (block) {
            const newX = xIndex * BLOCK_SIZE;
            const newY = yIndex * BLOCK_SIZE;

            block.setPosition(newX, newY);
          }
        }),
      );
    }
  }

  private checkCollision(): boolean {
    let isCollide = false;

    // TODO: check the if
    this.currentPiece?.forBlock(({ block }) => {
      if (block) {
        const x = block.x / BLOCK_SIZE;
        const y = block.y / BLOCK_SIZE + 1;

        if (this.matrix[y] && this.matrix[y][x]) {
          isCollide = true;
        }
      }
    });

    return isCollide;
  }

  private drawBackground(): void {
    let [x, y] = [0, 0];

    this.canvas.background(50);

    while (x < this.canvas.width) {
      this.canvas.line(x, 0, x, this.canvas.height);
      x += BLOCK_SIZE;
    }

    while (y < this.canvas.height) {
      this.canvas.line(0, y, this.canvas.width, y);
      y += BLOCK_SIZE;
    }
  }

  private showPhantomPiece(): void {
    this.currentPiece?.forBlock(({ block, lineIndex }) => {
      if (block && this.currentPiece) {
        const { x } = block;
        const y =
          (this.fistLineWithoutBlocks - this.currentPiece.height + lineIndex) *
          BLOCK_SIZE;

        this.canvas.fill(255, 255, 255, 50);
        this.canvas.rect(x, y, BLOCK_SIZE, BLOCK_SIZE);
      }
    });
  }

  private addPoints(multiplier: number): void {
    if (multiplier >= 0) {
      // TODO: ADD POINTS
      // game.points += POINTS[multiplier];
    }
  }

  show(): void {
    this.drawBackground();

    this.matrix.forEach((line) => {
      line.forEach((block) => block?.show(this.canvas));
    });

    this.currentPiece?.show();
    this.showPhantomPiece();
  }

  update(): void {
    this.currentPiece?.gravity();

    if (
      this.checkCollision() ||
      this.currentPiece?.checkBottomEdge() ||
      this.checkEndGame()
    ) {
      this.addCurrentPiece();
      this.getNextPiece();
    }
  }

  movePiece(key: number): boolean {
    const moviments: Moviments = {
      ...this.moviments,
      ...this.currentPiece?.moviments,
    };

    const moviment = moviments[key];

    if (moviment) {
      moviment();
    }

    this.fistLineWithoutBlocks = this.findFirstLineWithoutBlocks();
    return !!moviment;
  }

  // TODO: to refactor later. this method is wrong!!!!
  checkEndGame(): boolean {
    const [line] = this.matrix;

    const findBlock = !!line.find((block) => block);

    return findBlock;
  }
}

export default Board;
