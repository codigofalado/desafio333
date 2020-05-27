/* eslint-disable no-param-reassign */
import p5 from 'p5';

import { BOARD, BLOCK_SIZE, KEYS, TIME_INTERVAL } from '../../utils/constants';
import Board from './entities/Board';

function sketch(p: p5): void {
  let board: Board;

  let lastKeyPressed: number;

  let isPaused = false;

  let interval: number;

  let points: number;

  function pause(): void {
    console.log('pause game');

    clearInterval(interval);
    p.noLoop();
  }

  function play(): void {
    console.log('play game');

    if (!board.checkEndGame()) {
      interval = setInterval(() => {
        board.update();
      }, TIME_INTERVAL * 0.2);

      p.loop();
    }
  }

  function togglePlayed(): void {
    if (isPaused) {
      play();
    } else {
      pause();
    }

    isPaused = !isPaused;
  }

  p.setup = () => {
    p.createCanvas(BOARD.X * BLOCK_SIZE, BOARD.Y * BLOCK_SIZE);
    points = 0;

    board = new Board(p, {
      width: BOARD.X,
      height: BOARD.Y,
    });

    play();
  };

  p.draw = () => {
    board.show();

    // if (board.checkEndGame()) {
    //   p.playPause();
    // }
  };

  p.keyPressed = () => {
    if (p.keyCode === KEYS.Q) {
      togglePlayed();
      return;
    }

    if (!isPaused) {
      const moviments = [p.LEFT_ARROW, p.RIGHT_ARROW, p.DOWN_ARROW];

      const moved = board.movePiece(p.keyCode);

      if (moved && moviments.includes(p.keyCode)) {
        lastKeyPressed = p.keyCode;
      }
    }
  };
}

export default sketch;
