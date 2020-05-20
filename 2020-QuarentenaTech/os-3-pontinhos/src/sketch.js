let board;
let lastKeyPressed;

function setup() {
  createCanvas(BOARD_X * BLOCK_SIZE, BOARD_Y * BLOCK_SIZE);

  board = new Board({
    width: BOARD_X,
    height: BOARD_Y,
  });

  setInterval(() => {
    board.update();
  }, TIME_INTERVAL * 0.1);
}

function draw() {
  board.show();
}

function keyPressed() {
  // if(keyIsDown(lastKeyPressed)) moviments[key]();

  const moved = board.movePiece(key);

  if (moved) {
    lastKeyPressed = key;
  }
}

