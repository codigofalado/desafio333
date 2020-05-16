const BOARD_X = 10;
const BOARD_Y = 20;

const BLOCK_SIZE = 40;
const TIME_INTERVAL = 1000;

const I_MODEL = {
  shape: [[1, 1, 1, 1]],
  color: "#FFFF",
};

const J_MODEL = {
  shape: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  color: "#FFFF",
};

const L_MODEL = {
  shape: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  color: "#FFFF",
};

const O_MODEL = {
  shape: [
    [1, 1],
    [1, 1],
  ],
  color: "#FFFF",
};

const S_MODEL = {
  shape: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  color: "#FFFF",
};

const Z_MODEL = {
  shape: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  color: "#FFFF",
};

const T_MODEL = {
  shape: [
    [1, 1, 1],
    [0, 1, 0],
  ],
  color: "#FFFF",
};

const MODELS = [I_MODEL, J_MODEL, L_MODEL, O_MODEL, S_MODEL, Z_MODEL, T_MODEL];
