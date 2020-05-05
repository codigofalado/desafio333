const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let gameState = {
  roomCounter:0,
  players: {},
  rooms:{},
}

const setNewPlayer = require('./utils/setNewPlayer');
const playerDisconnect = require('./utils/playerDisconnect');
const searchAvailableRoom = require('./utils/searchAvailableRoom');

function emitGameStateLoop(socket){
  if (gameState.players[socket.id]){
    gameState = updateScenario(gameState,socket.id)
    socket.emit("gameState", gameState.players[socket.id])
    //setTimeout(()=>{emitGameStateLoop(socket)},interval)
  }
}

function cleanMatrixGhost(playerScenario){
  for (let y = 0; y < playerScenario.length; y++){
    for (let x = 0; x < playerScenario[y].length; x++){
      if (playerScenario[y][x] === 1){
        playerScenario[y][x] = 0
      }
    }
  }
  return playerScenario
}

function giveANewPiece(gameState,playerId){
  let player = gameState.players[playerId]
  player.matrixPosition = {x:3,y:0}
  player.collision = false
  return gameState
}

function pinLastPiece(playerScenario){
  for (let y = 0; y < playerScenario.length; y++){
    for (let x = 0; x < playerScenario[y].length; x++){
      if (playerScenario[y][x] === 1){
        playerScenario[y][x] = 2
      }
    }
  }
  return playerScenario
}

function updateScenario(gameState,playerId){
  let player = gameState.players[playerId]
  if (!player.collision){
    player.map = cleanMatrixGhost(player.map)
    for (let y = 0; y < player.map.length; y++){
      if (y === player.matrixPosition.y){
        for (let x = 0; x < player.map[y].length; x++){
          if (x === player.matrixPosition.x){
            matrix.map((yArrayFromMatrix,yKeyFromMatrix)=>{
              yArrayFromMatrix.map((xValueFromMatrix,xKeyFromMatrix)=>{
                
                if (player.map[y+yKeyFromMatrix+1]){
                  let valueInPosition = player.map[y+yKeyFromMatrix+1][x+xKeyFromMatrix]
                  if (valueInPosition === 1 || valueInPosition === 2){   
                    player.map[y+yKeyFromMatrix][x+xKeyFromMatrix] = xValueFromMatrix
                    player.collision = true
                    return null
                }}

                if (player.map[y+yKeyFromMatrix][x+xKeyFromMatrix] === 0){ 
                  player.map[y+yKeyFromMatrix][x+xKeyFromMatrix] = xValueFromMatrix
                } else (
                  player.collision = true
                )
                return null
              })
              return null
            })        
          }
        }
      }
    }
    if (matrix.length+player.matrixPosition.y < player.map.length){
      player.matrixPosition.y = player.matrixPosition.y+1
    } else {
      player.collision = true
    }
  } else {
    console.log('shut up and give me a new piece')
    player.map = pinLastPiece(player.map)
    gameState = giveANewPiece(gameState,playerId)
    
  }
  return gameState
}

const matrix = [
  [1,1,1],
  [0,1,0],
];


let intervals = {};

io.on("connection", (socket) => {
  const playerId = socket.id;
  console.log(`Player ${playerId} Connected`);
  socket.emit('playerId', playerId);
  socket.broadcast.emit('playerConnect', playerId);
  gameState = searchAvailableRoom(gameState,playerId)
  gameState = setNewPlayer(gameState,socket,gameState.roomCounter)
  //emitGameStateLoop(socket,1000)
  intervals[playerId] = setInterval(() => emitGameStateLoop(socket), 1000);
  socket.on('disconnect', function() {
    console.log(`Player ${playerId} Disconnected`);
    gameState = playerDisconnect(gameState,playerId);
    clearInterval(intervals[playerId]);
  });
});

server.listen(3000);