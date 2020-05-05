function searchAvailableRoom(gameState,playerId){
    let roomIds = Object.keys(gameState.rooms)
    if (roomIds.length > 0){
      for (let roomId of roomIds){
        if(gameState.rooms[roomId].length < 2){
          gameState.rooms[roomId].push(playerId) 
          return gameState
        }
      }     
    }
    gameState.roomCounter++
    gameState.rooms[gameState.roomCounter] = [playerId]
    return gameState
  }
module.exports = searchAvailableRoom;  