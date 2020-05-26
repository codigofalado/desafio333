class Board {
  moviments = {
    [KEY_D]: () => this._hardDrop(),
    [KEY_Q]: () => game.playPause(),
  };

  constructor(sizes) {
    this.sizes = sizes;

    this._initMatrix();
    this._nextPiece();
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
    const model = game.random(MODELS);
    //const model = MODELS[0];

    this.currentPiece = new Piece(model);
    this.phantomPiece = new Piece(model);

    this._fistLineWithoutBlocks = this._findFirstLineWithoutBlocks();
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

  _findFirstLineWithoutBlocks() {
    const { x, y, height, width } = this.currentPiece;

    const piecePosition = y / BLOCK_SIZE + height;

    const initialLine = piecePosition > 0 ? piecePosition : 0;
    const initialColumn = x / BLOCK_SIZE;

    for (let yIndex = initialLine; yIndex < this.matrix.length; yIndex += 1) {
      const line = this.matrix[yIndex].slice(
        initialColumn,
        initialColumn + width
      );

      for (let block of line) {
        if (block) {
          return yIndex;
        }
      }
    }

    return this.sizes.height;
  }

  _hardDrop() {
    if (!this.checkEndGame()) {
      this.currentPiece.dropTo(this._fistLineWithoutBlocks);

      this._addCurrentPiece();
      this._nextPiece();
    }
  }

  _checkCompleteLines() {
    const fullLineIndexes = [];

    this.matrix.forEach((line, index) => {
      if (this._isLineFilled(line)) {
        fullLineIndexes.push(index);
      }
    });

    const { length } = fullLineIndexes;
    this._addPoints(length - 1);

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

    game.background(50);

    while (x < game.width) {
      game.line(x, 0, x, game.height);
      x += BLOCK_SIZE;
    }

    while (y < game.height) {
      game.line(0, y, game.width, y);
      y += BLOCK_SIZE;
    }
  }

  _showPhantomPiece() {
    this.currentPiece.forBlock(({ block, lineIndex }) => {
      const x = block.x;
      const y =
        (this._fistLineWithoutBlocks - this.currentPiece.height + lineIndex) *
        BLOCK_SIZE;

      game.fill(255, 255, 255, 50);
      game.rect(x, y, BLOCK_SIZE, BLOCK_SIZE);
    });
  }

  qtyPoints = [40, 100, 300, 1200];

  _addPoints(multiplier) {
    if (multiplier >= 0) {
      let point = this.qtyPoints[multiplier];
      game.points += point;
    }
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

    if (
      this._checkCollision() ||
      this.currentPiece.checkBottomEdge() ||
      this.checkEndGame()
    ) {
      this._addCurrentPiece();
      this._nextPiece();
    }
  }

  movePiece(key) {
    const moviments = {
      ...this.currentPiece.moviments,
      ...this.moviments,
    };

    const moviment = moviments[key];

    if (moviment) {
      moviment();
    }

    this._fistLineWithoutBlocks = this._findFirstLineWithoutBlocks();
    return !!moviment;
  }

  _firstLineHasBlock() {
    let line = this.matrix[0];
    for (let block of line) {
      if (block) {
        return true;
      }
    }

    return false;
  }

  checkEndGame() {
    if (this._firstLineHasBlock()) {
      return true;
    }
    return false;
  }
}
