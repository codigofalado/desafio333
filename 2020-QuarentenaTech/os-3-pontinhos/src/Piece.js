class Piece {
  constructor({ x = width / 2, y = 0, initialShape = [[]], color } = {}) {
    this.x = x;
    this.y = y;

    this.color = color || this._randomColor();
    this.blocks = this._initBlocks(initialShape);
  }

  /**
   * Temporary function
   */
  _decToHex(number = random(255)) {
    return Math.floor(number).toString(16);
  }

  _randomColor() {
    return `#${this._decToHex()}${this._decToHex()}${this._decToHex()}`;
  }

  _initBlocks(model) {
    const blocks = [];

    model.forEach((line, yIndex) => {
      line.forEach((item, xIndex) => {
        if (item) {
          const block = new Block({
            x: this.x + xIndex * BLOCK_SIZE,
            y: this.y + yIndex * BLOCK_SIZE,
            color: this.color,
          });

          blocks.push(block);
        }
      });
    });

    return blocks;
  }

  show() {
    this.blocks.forEach((block) => block.show());
  }

  update() {
    this.blocks.forEach((block) => block.update());
  }
}
