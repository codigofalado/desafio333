const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

const square = 20;
const row = 20;
const column = 10
const vacant = 'white';

let board = [];

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x*square, y*square, square, square);

  ctx.strokeStyle = 'black';
  ctx.strokeRect(x*square, y*square, square, square);
}

for(let r = 0; r < row; r++){
  board[r] = [];
  for(let c = 0; c < column; c++){
    board[r][c] = vacant;
  }
}

function drawBoard() {
  for(let r=0; r<row; r++){
    for(let c=0; c<column; c++){
      drawSquare(c,r,board[r][c])
    }
  }
}

function Piece (Tetromino, color){
  this.Tetromino = Tetromino;
  this.TetrominoN = 0;
  this.activeTetromino = this.Tetromino[this.TetrominoN];
  this.color = color
  this.x = 3;
  this.y = -2;
}

Piece.prototype.draw = function() {
  for(let r = 0; r < this.activeTetromino.length; r++){
    for(let c = 0; c < this.activeTetromino.length; c++){
      if( this.activeTetromino[r][c] ) {
        drawSquare( this.x + c. this.y + r, this.color );
      }
    }
  }
}

Piece.prototype.unDraw = function() {
  for(let r = 0; r < this.activeTetromino.length; r++){
    for(let c = 0; c < this.activeTetromino.length; c++){
      if( this.activeTetromino[r][c] ) {
        drawSquare( this.x + c. this.y + r, vacant );
      }
    }
  }
}

Piece.prototype.collision = function ( x, y, piece ) {
  for( r = 0; r < piece.length; r++){
    for( c = 0; c < piece.length; c++){
      if( !piece[r][c]) {
        continue;
      }

      let newX = this.x + c + x;
      let newY = this.y + r + y;

      if( newX < 0 || newX >= column || newY > row){
        return true;
      }

      if( newY < 0 ) {
        continue;
      }

      if( board[newY][newX] != vacant){
        return true;
      }
    }
  }
  return false;
}

Piece.prototype.moveDown = function() {
  if(! this.collision( 0,1, this.activeTetromino )){
    this.unDraw();
    this.y++;
    this.draw();
  }else{
    //later..
  }
}

Piece.prototype.moveLeft = function() {
  if(! this.collision( -1, 0, this.activeTetromino )){
    this.unDraw();
    this.x--;
    this.draw();
  }else{
    //later..
  }
}

Piece.prototype.moveRight = function() {
  if(! this.collision( 1, 0, this.activeTetromino )){
    this.unDraw();
    this.x++;
    this.draw();
  }else{
    //later..
  }
}

let piece = new Piece(Z, "blue");

function control (e) {
  if(e.keyCode == 37){
    piece.moveLeft();
  }
  else if (e.keyCode == 38) {
    piece.rotate();
  }
  else if (e.keyCode == 39) {
    piece.moveRight();
  }
  else if (e.keyCode == 40) {
    piece.moveDown();
  }
}

document.addEventListener('keydown', control);
