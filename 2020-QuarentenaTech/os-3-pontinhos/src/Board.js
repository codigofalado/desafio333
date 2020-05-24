class Board {
  constructor(sizes) {
    this.sizes = sizes;
    this._fistLineWithoutBocks = 20;

    this._nextPiece();
    this._initMatrix();
  }

  _initLine() {
    return Array.from({ length: this.sizes.width }).map(() => null);
  }

  _initMatrix() {
    this.matrix = Array.from({ length: this.sizes.height }).map(() =>
      this._initLine()
    );
  }

  _nextPiece() {
    const model = MODELS[0]; // random(MODELS));
    this.currentPiece = new Piece(model);
    this.phantomPiece = new Piece(model);
  }

  _addCurrentPiece() {
    this.currentPiece.forBlock(({ block }) => {
      const xIndex = block.x / BLOCK_SIZE;
      const yIndex = block.y / BLOCK_SIZE;

      this.matrix[yIndex][xIndex] = block;
    });

    this._checkCompleteLines();
  }

  _isLineFilled(line) {
    for (let block of line) {
      if (!block) {
        return false;
      }
    }

    return true;
  }

  _checkCompleteLines() {
    const fullLineIndexes = [];

    this.matrix.forEach((line, index) => {
      if (this._isLineFilled(line)) {
        fullLineIndexes.push(index);
      }
    });

    const { length } = fullLineIndexes;

    if (length) {
      this.matrix.splice(fullLineIndexes[0], length);
      fullLineIndexes.forEach(() => this.matrix.unshift(this._initLine()));

      this.matrix.forEach((line, yIndex) =>
        line.forEach((block, xIndex) => {
          if (block) {
            block.x = xIndex * BLOCK_SIZE;
            block.y = yIndex * BLOCK_SIZE;
          }
        })
      );
    }
  }

  _checkCollision() {
    let isCollide = false;

    this.currentPiece.forBlock(({ block }) => {
      const x = block.x / BLOCK_SIZE;
      const y = block.y / BLOCK_SIZE + 1;

      if (this.matrix[y] && this.matrix[y][x]) {
        isCollide = true;
      }
    });

    return isCollide;
  }

  _drawBackground() {
    let [x, y] = [0, 0];

    background(50);

    while (x < width) {
      line(x, 0, x, height);
      x += BLOCK_SIZE;
    }

    while (y < height) {
      line(0, y, width, y);
      y += BLOCK_SIZE;
    }
  }

  _findFirstLineWithoutBlock() {
    const { x, y, height, width } = this.currentPiece;

    const initalLine = y / BLOCK_SIZE + height;
    const initialColumn = x / BLOCK_SIZE;

    for (let yIndex = initalLine; yIndex < this.matrix.length; yIndex += 1) {
      const line = this.matrix[yIndex];

      for (
        let xIndex = initialColumn;
        xIndex < initialColumn + width;
        xIndex += 1
      ) {
        const block = line[xIndex];

        if (block) {
          return yIndex;
        }
      }
    }

    return this.sizes.height;
  }

  _showPhantomPiece() {
    this.currentPiece.forBlock(({ block, lineIndex }) => {
      const x = block.x;
      const y =
        (this._fistLineWithoutBocks - this.currentPiece.height + lineIndex) *
        BLOCK_SIZE;

      fill(255, 255, 255, 50);
      rect(x, y, BLOCK_SIZE, BLOCK_SIZE);
    });
  }

  show() {
    this._drawBackground();

    this.matrix.forEach((line) => {
      line.forEach((block) => block && block.show());
    });

    this.currentPiece.show();
    this._showPhantomPiece();
  }

  update() {
    this.currentPiece.gravity();
    this._fistLineWithoutBocks = this._findFirstLineWithoutBlock();

    if (this._checkCollision() || this.currentPiece.checkBottomEdge()) {
      this._addCurrentPiece();
      this._nextPiece();
    }
  }

  movePiece(key) {
    const moviment = this.currentPiece.moviments[key];

    if (moviment) {
      moviment();
    }

    return !!moviment;
  }
}
