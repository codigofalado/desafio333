import React, { useState } from 'react';

import { Container, TicTacToe, Line, MiddleLine, Cell, MiddleCell, Text } from './styles';

var gameOver = false

function Game() {
  const [matrix, setMatrix] = useState(['','','','','','','','',''])
  const [chance, setChance] = useState(true)


  function handlePlay(player, cell) {
    if (matrix[cell] === 'X' || matrix[cell] === 'O' || gameOver) return;

    if (player) {
      matrix[cell] = 'X'
    }
    else {
      matrix[cell] = 'O'
    }


    if (matrix[0] === matrix[1] &&
      matrix[0] === matrix[2] &&
      matrix[2] === matrix[1] &&
      matrix[0] !== '' &&
      matrix[1] !== '' &&
      matrix[2] !== '') {
      gameOver = true
    }

    else if (matrix[3] === matrix[4] &&
      matrix[3] === matrix[5] &&
      matrix[4] === matrix[5] &&
      matrix[3] !== '' &&
      matrix[4] !== '' &&
      matrix[5] !== '') {
      gameOver = true
    }

    else if (matrix[6] === matrix[7] &&
      matrix[6] === matrix[8] &&
      matrix[7] === matrix[8] &&
      matrix[6] !== '' &&
      matrix[7] !== '' &&
      matrix[8] !== '') {
      gameOver = true
    }

    else if (matrix[0] === matrix[3] &&
      matrix[0] === matrix[6] &&
      matrix[3] === matrix[6] &&
      matrix[0] !== '' &&
      matrix[3] !== '' &&
      matrix[6] !== '') {
      gameOver = true
    }

    else if (matrix[1] === matrix[4] &&
      matrix[1] === matrix[7] &&
      matrix[4] === matrix[7] &&
      matrix[1] !== '' &&
      matrix[4] !== '' &&
      matrix[7] !== '') {
      gameOver = true
    }

    else if (matrix[2] === matrix[5] &&
      matrix[2] === matrix[8] &&
      matrix[5] === matrix[8] &&
      matrix[2] !== '' &&
      matrix[5] !== '' &&
      matrix[8] !== '') {
      gameOver = true
    }

    else if (matrix[0] === matrix[4] &&
      matrix[0] === matrix[8] &&
      matrix[4] === matrix[8] &&
      matrix[0] !== '' &&
      matrix[4] !== '' &&
      matrix[8] !== '') {
      gameOver = true
    }

    else if (matrix[2] === matrix[4] &&
      matrix[2] === matrix[6] &&
      matrix[4] === matrix[6] &&
      matrix[2] !== '' &&
      matrix[4] !== '' &&
      matrix[6] !== '') {
      gameOver = true
    }

    setMatrix(matrix)
    if (gameOver){
      alert(`O jogador ${chance ? 'X' : 'O' } ganhou`)
    }

    setChance(state => !state)
  }

  return (
    <Container>
      <TicTacToe>
        <Line>
          <Cell onPress={() => handlePlay(chance, 0)}><Text>{matrix[0]}</Text></Cell>
          <MiddleCell>
            <Cell onPress={() => handlePlay(chance, 1)}><Text>{matrix[1]}</Text></Cell>
          </MiddleCell>
          <Cell onPress={() => handlePlay(chance, 2)}><Text>{matrix[2]}</Text></Cell>
        </Line>
        <MiddleLine>
          <Cell onPress={() => handlePlay(chance, 3)}><Text>{matrix[3]}</Text></Cell>
          <MiddleCell>
            <Cell onPress={() => handlePlay(chance, 4)}><Text>{matrix[4]}</Text></Cell>
          </MiddleCell>
          <Cell onPress={() => handlePlay(chance, 5)}><Text>{matrix[5]}</Text></Cell>
        </MiddleLine>
        <Line>
          <Cell onPress={() => handlePlay(chance, 6)}><Text>{matrix[6]}</Text></Cell>
          <MiddleCell>
            <Cell onPress={() => handlePlay(chance, 7)}><Text>{matrix[7]}</Text></Cell>
          </MiddleCell>
          <Cell onPress={() => handlePlay(chance, 8)}><Text>{matrix[8]}</Text></Cell>
        </Line>
      </TicTacToe>
    </Container>
  )
}

export default Game;