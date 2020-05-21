class Board {
  constructor(sizes) {
    this.sizes = sizes;

    this._nextPiece();

    this.matrix = Array.from({ length: sizes.height }).map(() =>
      this._initLine()
    );
  }

  _initLine() {
    return Array.from({ length: this.sizes.width }).map(() => null);
  }

  _nextPiece() {
    this.currentPiece = new Piece(MODELS[0]); // random(MODELS));
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
      if (_isLineFilled(line)) {
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
