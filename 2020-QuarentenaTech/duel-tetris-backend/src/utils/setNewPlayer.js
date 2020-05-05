const buildMap = require('./buildMap');
function setNewPlayer(gameState,socket,playerRoom){
    gameState.players[socket.id] = {
      room:playerRoom,
      matrix: 0,
      matrixPosition:{x:3,y:0},
      collision:false,
      map:buildMap(10,10),
    }
    return gameState
  }
module.exports = setNewPlayer;