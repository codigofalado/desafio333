const BOARD_X = 10;
const BOARD_Y = 20;

const BLOCK_SIZE = 40;
const TIME_INTERVAL = 1000;

const I_MODEL = {
  shape: [[1, 1, 1, 1]],
  color: "#FFFF",
  pieceWidth: 4,
  pieceHeight: 1,
};

const J_MODEL = {
  shape: [
    [0, 0, 1],
    [1, 1, 1],
    //[0, 0, 0],
  ],
  color: "#FFFF",
  pieceWidth: 3,
  pieceHeight: 2,
};

const L_MODEL = {
  shape: [
    [1, 0, 0],
    [1, 1, 1],
    //[0, 0, 0],
  ],
  color: "#FFFF",
  pieceWidth: 3,
  pieceHeight: 2,
};

const O_MODEL = {
  shape: [
    [1, 1],
    [1, 1],
  ],
  color: "#FFFF",
  pieceWidth: 2,
  pieceHeight: 2,
};

const S_MODEL = {
  shape: [
    [0, 1, 1],
    [1, 1, 0],
    //[0, 0, 0],
  ],
  color: "#FFFF",
  pieceWidth: 3,
  pieceHeight: 2,
};

const Z_MODEL = {
  shape: [
    [1, 1, 0],
    [0, 1, 1],
    //[0, 0, 0],
  ],
  color: "#FFFF",
  pieceWidth: 3,
  pieceHeight: 2,
};

const T_MODEL = {
  shape: [
    [1, 1, 1],
    [0, 1, 0],
    //[0, 0, 0],
  ],
  color: "#FFFF",
  pieceWidth: 3,
  pieceHeight: 2,
};

const MODELS = [I_MODEL, J_MODEL, L_MODEL, O_MODEL, S_MODEL, Z_MODEL, T_MODEL];
