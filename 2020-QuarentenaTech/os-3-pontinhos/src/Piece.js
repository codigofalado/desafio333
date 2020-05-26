class Piece {
  moviments = {
    [game.LEFT_ARROW]: () => {
      this.moveHorizontally(-1);
    },
    [game.RIGHT_ARROW]: () => {
      this.moveHorizontally();
    },
    [game.UP_ARROW]: () => {
      this.rotateClockwise();
    },
    [KEY_A]: () => {
      this.rotateClockwise();
    },
    [KEY_S]: () => {
      this.rotateAntiClockwise();
    },
  };

  constructor({ shape, color, ...size }) {
    this.x = game.width / 2 - BLOCK_SIZE;
    this.y = -2 * BLOCK_SIZE;

    this.width = size.width;
    this.height = size.height;

    this.color = color || this._randomColor();
    this.blocks = this._initBlocks(shape);
  }

  _randomColor() {
    function decToHex() {
      return Math.floor(random(255)).toString(16);
    }

    return `#${decToHex()}${decToHex()}${decToHex()}`;
  }

  // TODO: Refactor: use map function
  _initBlocks(model) {
    const blocks = [];

    model.forEach((line, yIndex) => {
      const blockLine = [];

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

  updateBlocksPosition() {
    this.forBlock(({ block, index, lineIndex }) => {
      block.x = this.x + index * BLOCK_SIZE;
      block.y = this.y + lineIndex * BLOCK_SIZE;
    });
  }

  forBlock(callback, onlyNotNull = true) {
    this.blocks.forEach((line, lineIndex) =>
      line.forEach((block, index) => {
        (!onlyNotNull || block) && callback({ block, index, line, lineIndex });
      })
    );
  }

  /**
   * direction = 1  -> right
   * direction = -1 -> left
   */
  moveHorizontally(direction = 1) {
    if (this.checkSideEdges(direction)) {
      return;
    }

    this.x += direction * BLOCK_SIZE;

    this.forBlock(({ block }) => {
      block.moveHorizontally(direction);
    });
  }

  dropTo(yPosition) {
    const y = (yPosition - this.height) * BLOCK_SIZE;

    this.y = y;
    this.updateBlocksPosition();
  }

  gravity() {
    this.y += BLOCK_SIZE;
    this.forBlock(({ block }) => block.gravity());
  }

  rotateClockwise() {
    this.height = [this.width, (this.width = this.height)][0];

    const { length } = this.blocks[0];
    const newMatrix = Array.from({ length }).map(() => []);

    this.forBlock(({ block, index }) => newMatrix[index].unshift(block), false);

    this.blocks = newMatrix;

    this.updateBlocksPosition();

    this.checkPieceInBoard();
  }

  // TODO: For refactor later
  rotateAntiClockwise() {
    for (let i = 0; i < 3; i++) {
      this.rotateClockwise();
    }
  }

  checkSideEdges(direction) {
    const leftEdge = direction === -1 && this.x === 0;

    const rightEdge =
      direction === 1 && this.x + this.width * BLOCK_SIZE === game.width;

    return leftEdge || rightEdge;
  }

  // TODO: For refactor later
  checkPieceInBoard() {
    if (this.x + this.width * BLOCK_SIZE > game.width) {
      this.moveHorizontally(-1);
      if (this.x + this.width * BLOCK_SIZE > game.width) {
        this.moveHorizontally(-1);
        if (this.x + this.width * BLOCK_SIZE > game.width) {
          this.moveHorizontally(-1);
        }
      }
    }
  }

  checkBottomEdge() {
    return this.y + this.height * BLOCK_SIZE === game.height;
  }

  show() {
    this.forBlock(({ block }) => block.show());

    game.circle(this.x, this.y, 10);
    game.circle(this.x + this.width * BLOCK_SIZE, this.y, 10);
    game.circle(this.x, this.y + this.height * BLOCK_SIZE, 10);
    game.circle(
      this.x + this.width * BLOCK_SIZE,
      this.y + this.height * BLOCK_SIZE,
      10
    );
  }
}
