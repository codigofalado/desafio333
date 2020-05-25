const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_Q = 81;

const BOARD_X = 10;
const BOARD_Y = 20;

const BLOCK_SIZE = 40;
const TIME_INTERVAL = 1000;

const MENU_X = 200;
const MENU_Y = BOARD_Y * BLOCK_SIZE;

const I_MODEL = {
  shape: [[1, 1, 1, 1]],
  color: "#00ADEE",
  width: 4,
  height: 1,
};

const J_MODEL = {
  shape: [
    [1, 1, 1],
    [1, 0, 0],
    //[0, 0, 0],
  ],
  color: "#F6921E",
  width: 3,
  height: 2,
};

const L_MODEL = {
  shape: [
    [1, 1, 1],
    [0, 0, 1],
    //[0, 0, 0],
  ],
  color: "#1B75BB",
  width: 3,
  height: 2,
};

const O_MODEL = {
  shape: [
    [1, 1],
    [1, 1],
  ],
  color: "#FFF100",
  width: 2,
  height: 2,
};

const S_MODEL = {
  shape: [
    [0, 1, 1],
    [1, 1, 0],
    //[0, 0, 0],
  ],
  color: "#8BC53F",
  width: 3,
  height: 2,
};

const Z_MODEL = {
  shape: [
    [1, 1, 0],
    [0, 1, 1],
    //[0, 0, 0],
  ],
  color: "#EC1C24",
  width: 3,
  height: 2,
};

const T_MODEL = {
  shape: [
    [1, 1, 1],
    [0, 1, 0],
    //[0, 0, 0],
  ],
  color: "#652D90",
  width: 3,
  height: 2,
};

const MODELS = [I_MODEL, J_MODEL, L_MODEL, O_MODEL, S_MODEL, Z_MODEL, T_MODEL];
