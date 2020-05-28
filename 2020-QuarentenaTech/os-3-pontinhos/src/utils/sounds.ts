import Uifx from 'uifx';

import soundEndGame from '../assets/sounds/endGame.wav';
import soundLineComplete from '../assets/sounds/lineComplete.wav';
import soundPieceColision from '../assets/sounds/pieceColision.wav';
import soundPieceMovement from '../assets/sounds/pieceMovement.wav';

const config = { volume: 0.3 };

const pieceMovement = new Uifx(soundPieceMovement, { volume: 0.1 });
const lineComplete = new Uifx(soundLineComplete, config);
const pieceColision = new Uifx(soundPieceColision, config);
const endGame = new Uifx(soundEndGame, config);

export default {
  pieceColision,
  pieceMovement,
  lineComplete,
  endGame,
};
