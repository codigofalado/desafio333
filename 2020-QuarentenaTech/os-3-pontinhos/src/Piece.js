const INITIAL_DATA = {
  x = width / 2, 
  y = 0,
  initialShape = [[]], 
  color: `#${_decToHex()}${_decToHex()}${_decToHex()}`,
}

class Piece {
  constructor(data = INITIAL_DATA) {
    const { x, y, initialShape, color } = data;

    this.x = x;
    this.y = y;

    this.color = color;
    this.blocks = this._initBlocks(initialShape);
  }

  /**
   * Temporary function
   */
  _decToHex(number = random(255)) {
    return Math.floor(number).toString(16);
  }

  _initBlocks(model) {
    const blocks = [];
    
    model.foreach((line, yIndex) => {
      line.foreach((item, xIndex) => {
        if (item) {
          const block = new Block({
            x: this.x + xIndex,
            y: this.y + yIndex,
            color: this.color,
          });

          block.push(block);
        }
      });
    });

    return blocks;
  }

  show() {
    this.blocks.foreach(block => block.show());
  }

  update() {
    this.blocks.foreach(block => block.update());
  }
}
