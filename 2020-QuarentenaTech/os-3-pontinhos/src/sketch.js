let board;
let lastKeyPressed;
let interval;

function setup() {
  createCanvas(BOARD_X * BLOCK_SIZE, BOARD_Y * BLOCK_SIZE);

  board = new Board({
    width: BOARD_X,
    height: BOARD_Y,
  });

  interval = setInterval(() => {
    board.update();
  }, TIME_INTERVAL * 0.2);
}

function stop() {
  clearInterval(interval);
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

