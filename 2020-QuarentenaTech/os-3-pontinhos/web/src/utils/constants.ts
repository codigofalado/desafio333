const I_MODEL = {
  shape: [[1, 1, 1, 1]],
  color: '#00ADEE',
  width: 4,
  height: 1,
};

const J_MODEL = {
  shape: [
    [1, 1, 1],
    [1, 0, 0],
    // [0, 0, 0],
  ],
  color: '#F6921E',
  width: 3,
  height: 2,
};

const L_MODEL = {
  shape: [
    [1, 1, 1],
    [0, 0, 1],
    // [0, 0, 0],
  ],
  color: '#1B75BB',
  width: 3,
  height: 2,
};

const O_MODEL = {
  shape: [
    [1, 1],
    [1, 1],
  ],
  color: '#FFF100',
  width: 2,
  height: 2,
};

const S_MODEL = {
  shape: [
    [0, 1, 1],
    [1, 1, 0],
    // [0, 0, 0],
  ],
  color: '#8BC53F',
  width: 3,
  height: 2,
};

const Z_MODEL = {
  shape: [
    [1, 1, 0],
    [0, 1, 1],
    // [0, 0, 0],
  ],
  color: '#EC1C24',
  width: 3,
  height: 2,
};

const T_MODEL = {
  shape: [
    [1, 1, 1],
    [0, 1, 0],
    // [0, 0, 0],
  ],
  color: '#652D90',
  width: 3,
  height: 2,
};

export const BLOCK_SIZE = 35;
export const TIME_INTERVAL = 1000;

export const BOARD = {
  X: 10,
  Y: 20,
};

export const KEYS = {
  A: 65,
  S: 83,
  D: 68,
  Q: 81,
};

export const MODELS = [
  I_MODEL,
  J_MODEL,
  L_MODEL,
  O_MODEL,
  S_MODEL,
  Z_MODEL,
  T_MODEL,
];
