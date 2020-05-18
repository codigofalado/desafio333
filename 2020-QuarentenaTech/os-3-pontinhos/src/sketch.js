let piece;
let lastKeyPressed;
let moviments;

function setup() {
  createCanvas(BOARD_X * BLOCK_SIZE, BOARD_Y * BLOCK_SIZE);

  piece = new Piece(random(MODELS));

  moviments = {
    ArrowLeft: () => {
      if (piece.checkSideEdges() != "l") piece.moveHorizontally(-1);
    },
    ArrowRight: () => {
      if (piece.checkSideEdges() != "r") piece.moveHorizontally();
    },
    a: () => {
      piece.rotate();
    },
    s: () => {},
  };

  setInterval(() => {
    piece.update();
  }, TIME_INTERVAL);
}

function draw() {
  drawBackground();

  translate(-BLOCK_SIZE, 0);

  piece.show();
  //piece.checkBottomEdge();
}

function keyPressed() {
  /*
  if(keyIsDown(lastKeyPressed)){
    moviments[key]();
  }
  */

  const moviment = moviments[key];

  if (moviment) {
    moviment();
    lastKeyPressed = key;
  }
}

function drawBackground() {
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
