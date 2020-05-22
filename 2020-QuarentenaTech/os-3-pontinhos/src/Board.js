class Board {
  constructor(sizes) {
    this.sizes = sizes;

    this._nextPiece();

    this._initMatrix();
  }

  _initMatrix() {
    this.matrix = Array.from({ length: this.sizes.height }).map(() =>
      this._initLine()
    );
  }

  _initLine() {
    return Array.from({ length: this.sizes.width }).map(() => null);
  }

  _nextPiece() {
    this.currentPiece = new Piece(game.random(MODELS));
  }

  _addCurrentPiece() {
    this.currentPiece.forBlock(({ block }) => {
      const x = block.x / BLOCK_SIZE;
      const y = block.y / BLOCK_SIZE;

      this.matrix[y][x] = block;
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

  show() {
    this._drawBackground();

    this.matrix.forEach((line) => {
      line.forEach((block) => block && block.show());
    });

    this.currentPiece.show();
  }

  update() {
    this.currentPiece.gravity();

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
