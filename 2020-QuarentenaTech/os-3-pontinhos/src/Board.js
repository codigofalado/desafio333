class Board {
  constructor(sizes) {
    this._nextPiece();

    this.matrix = Array.from({ length: sizes.height }).map(() =>
      Array.from({ length: sizes.width }).map(() => null)
    );
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

    // this._checkCompleteLines();
  }

  _checkCompleteLines() {
    this.matrix.forEach((line) => {
      // check if the line is full of blocks
      // save line index if true
      // re init the line
    });

    // Down blocks for the nummber of removed lines
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
