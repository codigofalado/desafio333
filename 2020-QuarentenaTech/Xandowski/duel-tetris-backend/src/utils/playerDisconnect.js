function playerDisconnect(gameState,playerId){  
    let playerRoomNumber = gameState.players[playerId].room
    let roomFinded = gameState.rooms[playerRoomNumber]
    if (roomFinded && roomFinded.length < 2){
      gameState.rooms[playerRoomNumber] = roomFinded.filter(e => e !== playerId);
    }
    gameState.players[playerId] = undefined;
    return gameState
  }
module.exports = playerDisconnect;