class Board {
  constructor(sizes) {
    this._nextPiece();

    this.matrix = Array.from({ length: sizes.height }).map(() =>
      Array.from({ length: sizes.width }).map(() => null)
    );
  }

  _nextPiece() {
    this.currentPiece = new Piece(random(MODELS));
  }

  _addCurrentPiece(){
    this.currentPiece.forBlock(({ block }) => {
      const x = block.x / BLOCK_SIZE;
      const y = block.y / BLOCK_SIZE;

      this.matrix[y][x] = block;
    });

    // this._checkCompleteLines();
  }

  _checkCompleteLines() {
    this.matrix.forEach(line => {
      // check if the line is full of blocks
      // save line index if true
      // re init the line
    })

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
    })

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
