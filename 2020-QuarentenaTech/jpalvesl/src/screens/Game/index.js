import React from 'react';

import { Container, TicTacToe, Line, MiddleLine, Cell, MiddleCell } from './styles';

function Game() {
  return (
    <Container>
      <TicTacToe>
        <Line>
          <Cell></Cell>
          <MiddleCell>
            <Cell></Cell>
          </MiddleCell>
          <Cell></Cell>
        </Line>
        <MiddleLine>
          <Cell></Cell>
          <MiddleCell>
            <Cell></Cell>
          </MiddleCell>
          <Cell></Cell>
        </MiddleLine>
        <Line>
          <Cell></Cell>
          <MiddleCell>
            <Cell></Cell>
          </MiddleCell>
          <Cell></Cell>
        </Line>
      </TicTacToe>
    </Container>
  )
}

export default Game;