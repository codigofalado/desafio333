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

    console.log("pause time");
  };

  p.play = function () {
    interval = setInterval(() => {
      board.update();
    }, TIME_INTERVAL);
    p.loop();

    console.log("play time");
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

function sideBar(p) {
  let buttonWidth = 200;
  let buttonHeight = 100;

  let state = 0;

  p.setup = function () {
    p.createCanvas(MENU_X, MENU_Y);

    playButton = new Clickable({
      x: MENU_X / 2 - buttonWidth / 2,
      y: MENU_Y / 2 - buttonHeight / 2 - 125 + 100,
      text: "Jogar",
      textSize: 48,
    });
    settingsButton = new Clickable({
      x: MENU_X / 2 - buttonWidth / 2,
      y: MENU_Y / 2 - buttonHeight / 2 + 100,
      text: "Configurações",
      textSize: 29,
    });
    helpButton = new Clickable({
      x: MENU_X / 2 - buttonWidth / 2,
      y: MENU_Y / 2 - buttonHeight / 2 + 125 + 100,
      text: "Ajuda",
      textSize: 48,
    });
    returnButton = new Clickable({
      x: 20,
      y: 20,
      width: 50,
      height: 30,
      text: "Return",
    });

    playButton.onPress = function () {
      setTimeout(() => {
        state = 1;
        console.log("Game Start");
      }, 0);
    };
    settingsButton.onPress = function () {
      state = 2;
      console.log("Configurações");
    };
    helpButton.onPress = function () {
      state = 3;
      console.log("Ajuda");
    };

    returnButton.onPress = function () {
      state = 0;
    };
  };

  p.draw = function () {
    p.background(42);

    //Off game menu state
    if (state === 0) {
      playButton.draw();
      settingsButton.draw();
      helpButton.draw();
    }
    //In game state
    if (state === 1) {
      //Game starts

      // Show difficulty

      //Show level

      //Show points

      ///Show next piece

      returnButton.draw();
    }
    //Configurations state
    if (state === 2) {
      returnButton.draw();
    }
    //Help state
    if (state === 3) {
      returnButton.draw();
    }
  };
}

let menu = new p5(sideBar);
let game = new p5(gameSketch);
