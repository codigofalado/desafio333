function gameSketch(p) {
  let board;
  let lastKeyPressed;
  let pauseLock = false;
  let interval;

  p.setup = function () {
    p.createCanvas(BOARD_X * BLOCK_SIZE, BOARD_Y * BLOCK_SIZE);

    board = new Board({
      width: BOARD_X,
      height: BOARD_Y,
    });

    p.playPause();
  };

  p.playPause = function () {
    if (pauseLock) {
      p.play();
      pauseLock = false;
    } else {
      p.pause(interval);
      pauseLock = true;
    }
  };

  p.pause = function (interval) {
    clearInterval(interval);
    p.noLoop();
  };

  p.play = function () {
    interval = setInterval(() => {
      board.update();
    }, TIME_INTERVAL);
    p.loop();

    return interval;
  };

  p.draw = function () {
    board.show();
    console.log(interval);
  };

  p.keyPressed = function () {
    // if(keyIsDown(lastKeyPressed)) moviments[key]();

    const moved = board.movePiece(p.key);

    if (moved) {
      lastKeyPressed = p.key;
    }
  };
}

let game = new p5(gameSketch);
