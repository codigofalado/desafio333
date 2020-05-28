import P5 from 'p5';
import { opacify } from 'polished';

import { ConfigData } from '../../../hooks/config';
import theme from '../../../styles/themes';
import { KEYS, MODELS, BLOCK_SIZE, POINTS } from '../../../utils/constants';
import sounds from '../../../utils/sounds';
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

  private matrix: Blocks;

  private pieceStack: Piece[];

  private phantomPiece: Piece;

  currentPiece: Piece;

  nextPiece?: Piece;

  level: number;

  points: number;

  constructor(
    private canvas: P5,
    private config: Omit<ConfigData, 'difficulty'>,
    private sizes: Sizes,
  ) {
    this.pieceStack = [];
    this.matrix = this.initMatrix();

    this.currentPiece = this.createPiace();
    this.phantomPiece = this.createPhantomPiece();
    this.initPieceStack();

    this.getNextPiece();

    this.level = 1;
    this.points = 0;

    this.displayPoints();

    this.moviments = {
      [KEYS.D]: () => this.hardDrop(),
    };
  }

  private initLine(): null[] {
    return Array.from({ length: this.sizes.width }).map(() => null);
  }

  private initMatrix(): null[][] {
    return Array.from({ length: this.sizes.height }).map(() => this.initLine());
  }

  private createPiace(): Piece {
    return new Piece(this.canvas, this.canvas.random(MODELS));
  }

  private createPhantomPiece(): Piece {
    const { color, shape, height, width, x, y } = this.currentPiece;

    const phantomPiece = new Piece(this.canvas, {
      color: opacify(-0.7, color),
      shape,
      height,
      width,
    });

    phantomPiece.x = x;
    phantomPiece.y = y;

    phantomPiece.updateBlocksPosition();

    while (
      !this.checkCollision(phantomPiece) &&
      !phantomPiece.checkBottomEdge()
    ) {
      phantomPiece.gravity();
    }

    return phantomPiece;
  }

  private initPieceStack(): void {
    this.pieceStack.push(this.createPiace());
    this.pieceStack.push(this.createPiace());
  }

  private getNextPiece(): void {
    [, this.nextPiece] = this.pieceStack;

    [this.currentPiece] = this.pieceStack.splice(0, 1);

    this.pieceStack.push(new Piece(this.canvas, this.canvas.random(MODELS)));

    this.nextPiece.saveImg();

    this.phantomPiece = this.createPhantomPiece();
  }

  private addCurrentPiece(): void {
    this.currentPiece.forBlock(({ block }) => {
      if (block) {
        const xIndex = block.x / BLOCK_SIZE;
        const yIndex = block.y / BLOCK_SIZE;

        this.matrix[yIndex][xIndex] = block;
      }
    });

    sounds.pieceColision.play();

    this.checkCompleteLines();
  }

  private isLineFilled(line: LineOfBlocks): boolean {
    // Check if at lest one no block on line,
    // if not, find return undefined = line is filled;
    return line.find((block) => !block) === undefined;
  }

  private hardDrop(): void {
    if (!this.checkEndGame()) {
      const { x, y } = this.phantomPiece;

      this.currentPiece.x = x;
      this.currentPiece.y = y;

      this.currentPiece.updateBlocksPosition();

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
      sounds.lineComplete.play();

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

  private checkCollision(piece = this.currentPiece): boolean {
    let isCollide = false;

    // TODO: check the if
    piece.forBlock(({ block }) => {
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

    this.canvas.background(theme.colors.backgroundDark);

    if (this.config.gridEnabled) {
      while (x < this.canvas.width) {
        this.canvas.line(x, 0, x, this.canvas.height);
        x += BLOCK_SIZE;
      }

      while (y < this.canvas.height) {
        this.canvas.line(0, y, this.canvas.width, y);
        y += BLOCK_SIZE;
      }
    }
  }

  private displayPoints(): void {
    const pointsElement = document.getElementById('points');

    if (pointsElement) {
      pointsElement.innerText = String(this.points);
    }
  }

  private addPoints(multiplier: number): void {
    if (multiplier >= 0) {
      this.points += POINTS[multiplier];
    }

    this.displayPoints();
  }

  show(): void {
    this.drawBackground();

    if (!this.config.gridEnabled) {
      this.canvas.noStroke();
    }

    this.matrix.forEach((line) => {
      line.forEach((block) => block?.show(this.canvas));
    });

    if (this.config.phantomPieceEnabled) {
      this.phantomPiece.show();
    }

    this.currentPiece.show();
  }

  update(): void {
    this.currentPiece.gravity();

    if (
      this.checkCollision() ||
      this.currentPiece.checkBottomEdge() ||
      this.checkEndGame()
    ) {
      this.addCurrentPiece();
      this.getNextPiece();
    }
  }

  movePiece(key: number): boolean {
    const moviments: Moviments = {
      ...this.moviments,
      ...this.currentPiece.moviments,
    };

    const moviment = moviments[key];

    if (moviment) {
      moviment();
    }

    this.phantomPiece = this.createPhantomPiece();

    sounds.pieceMovement.play();

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
