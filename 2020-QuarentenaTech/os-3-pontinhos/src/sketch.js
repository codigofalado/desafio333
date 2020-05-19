let piece;
let lastKeyPressed;
let moviments;
let board;

function setup() {
  createCanvas(BOARD_X * BLOCK_SIZE, BOARD_Y * BLOCK_SIZE);

  piece = new Piece(random(MODELS));

  board = new Board({
    width: BOARD_X,
    height: BOARD_Y,
  });

  moviments = {
    ArrowLeft() {
      piece.moveHorizontally(-1);
    },
    ArrowRight() {
      piece.moveHorizontally();
    },
    ArrowUp() {
      piece.rotateClockwise();
    },
    a() {
      piece.rotateClockwise();
    },
    s() {
      piece.rotateAntiClockwise();
    },
  };

  setInterval(() => {
    piece.gravity();
  }, TIME_INTERVAL * 0.1);
}

function draw() {
  drawBackground();

  piece.show();
  board.show();

  if (board.checkCollision(piece) || piece.checkBottomEdge()) {
    board.addPiece(piece);
    piece = new Piece(random(MODELS));
  }
}

function keyPressed() {
  // if(keyIsDown(lastKeyPressed)) moviments[key]();

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
