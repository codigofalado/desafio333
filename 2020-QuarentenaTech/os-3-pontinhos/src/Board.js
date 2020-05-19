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
    piece.forBlock(({ block, index, lineIndex }) => {
      const x = block.x / BLOCK_SIZE;
      const y = block.y / BLOCK_SIZE;

      this.matrix[y][x] = block;
    });
  }
}
