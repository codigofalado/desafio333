class Board {
  constructor(sizes) {
    this.matrix = Array.from({ length: sizes.height }).map(() =>
      Array.from({ length: sizes.width }).map(() => null)
    );
  }

  show() {
    this.matrix.forEach((line) => {
      line.forEach((block) => block && block.show());
    });
  }

  addPiece(piece){
    piece.forBlock(({ block }) => {
      const x = block.x / BLOCK_SIZE;
      const y = block.y / BLOCK_SIZE;

      this.matrix[y][x] = block;
    });

    // this.checkCompleteLines();
  }

  checkCompleteLines() {
    this.matrix.forEach(line => {
      // check if the line is full of blocks
      // save line index if true
      // re init the line
    })

    // Down blocks for the nummber of removed lines 
  }

  checkCollision(piace) {
    // piece.forBlock(({ block }) => {
        // check collision
        // if collided, return true
        //
    // });

    return false;
  }
}
