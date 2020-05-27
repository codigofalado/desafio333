/* eslint-disable no-param-reassign */
import p5 from 'p5';

import { BOARD, BLOCK_SIZE, KEYS, TIME_INTERVAL } from '../../utils/constants';
import Board from './entities/Board';

function sketch(p: p5): void {
  let board: Board;
  let lastKeyPressed: number;
  const pauseLock = false;
  let interval: number;
  let points: number;

  p.setup = () => {
    p.createCanvas(BOARD.X * BLOCK_SIZE, BOARD.Y * BLOCK_SIZE);
    points = 0;

    board = new Board(p, {
      width: BOARD.X,
      height: BOARD.Y,
    });

    interval = setInterval(() => {
      board.update();
    }, TIME_INTERVAL * 0.2);
    // p.playPause();
  };

  /**
     p.tooglePlayed = () => {
    if (pauseLock) {
      console.log("play game");
      p.play();
      pauseLock = false;
    } else {
      console.log("pause game");
      p.pause(interval);
      pauseLock = true;
    }
  };

  p.pause = (interval) => {
    clearInterval(interval);
    p.noLoop();
  };

  p.play = () => {
    if (!board.checkEndGame()) {
      interval = setInterval(() => {
        board.update();
      }, TIME_INTERVAL * 0.2);

      p.loop();

      return interval;
    }
  };
   */

  p.draw = () => {
    board.show();

    // if (board.checkEndGame()) {
    //   p.playPause();
    // }
  };

  p.keyPressed = () => {
    if (!pauseLock || p.keyCode === KEYS.Q) {
      const moviments = [p.LEFT_ARROW, p.RIGHT_ARROW, p.DOWN_ARROW];

      const moved = board.movePiece(p.keyCode);
      // console.log(p.keyCode);

      if (moved && moviments.includes(p.keyCode)) {
        lastKeyPressed = p.keyCode;
      }
    }
  };
}

export default sketch;
