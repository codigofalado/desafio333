let piece;

function setup() {
  createCanvas(BOARD_X * BLOCK_SIZE, BOARD_Y * BLOCK_SIZE);

  piece = new Piece({
    initialShape: SHAPES[0],
    x: width / 2 - BLOCK_SIZE,
    y: 0,
  });

  // setInterval(() => {
  //   block.update();
  // }, TIME_INTERVAL);
}

function draw() {
  drawBackground();

  // translate(-BLOCK_SIZE, 0);

  piece.show();
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
