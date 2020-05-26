/* eslint-disable no-param-reassign */
import p5 from 'p5';

import { MODELS, BOARD, BLOCK_SIZE } from '../../utils/constants';
import Piece from './entities/Piece';

function sketch(p: p5): void {
  let piece: Piece;

  p.setup = () => {
    p.createCanvas(BOARD.X * BLOCK_SIZE, BOARD.Y * BLOCK_SIZE);
    p.background(0);

    piece = new Piece(p, {
      color: '#fff',
      ...MODELS[0],
    });

    piece.gravity();
    piece.gravity();
    piece.gravity();
    piece.gravity();
    piece.gravity();
    piece.gravity();
  };

  p.draw = () => {
    piece.show();
  };
}

export default sketch;
