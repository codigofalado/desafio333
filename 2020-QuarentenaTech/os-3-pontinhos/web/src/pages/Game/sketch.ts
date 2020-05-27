/* eslint-disable no-param-reassign */
import P5 from 'p5';

import { ConfigData } from '../../hooks/config';
import { BOARD, BLOCK_SIZE, KEYS, TIME_INTERVAL } from '../../utils/constants';
import Board from './entities/Board';

type Sketch = (p: P5) => void;

function createSketch(config: ConfigData): Sketch {
  function sketch(p: P5): void {
    let board: Board;

    let lastKeyPressed: number;

    let isPaused = false;

    let interval: number;

    let points: number;

    function pause(): void {
      clearInterval(interval);
      p.noLoop();
    }

    function play(): void {
      console.log(config.difficulty);

      if (!board.checkEndGame()) {
        interval = setInterval(() => {
          board.update();
        }, TIME_INTERVAL / (config.difficulty + 1) ** 2);

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

      const sizes = {
        width: BOARD.X,
        height: BOARD.Y,
      };

      board = new Board(p, config, sizes);

      play();
    };

    p.draw = () => {
      board.show();

      if (board.checkEndGame()) {
        togglePlayed();
      }
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

  return sketch;
}

export { createSketch };
