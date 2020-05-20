let gameSketch = function (p) {
  let board;
  let lastKeyPressed;

  p.setup = function () {
    p.createCanvas(BOARD_X * BLOCK_SIZE, BOARD_Y * BLOCK_SIZE);

    board = new Board({
      width: BOARD_X,
      height: BOARD_Y,
    });

    setInterval(() => {
      board.update();
    }, TIME_INTERVAL);
  };

  p.draw = function () {
    board.show();
  };

  p.keyPressed = function () {
    // if(keyIsDown(lastKeyPressed)) moviments[key]();

    const moved = board.movePiece(p.key);

    if (moved) {
      lastKeyPressed = p.key;
    }
  };
};

let game = new p5(gameSketch);
