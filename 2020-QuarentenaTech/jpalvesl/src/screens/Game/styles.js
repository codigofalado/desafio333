import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

export const TicTacToe = styled.View`
  width: 65%;
  height: 65%;
  background-color: red;
`;

export const Line = styled.View`
  flex: 0.5;
  flex-direction: row;
`;

export const MiddleLine = styled.View`
  border: 1px solid yellow;
  border-left-width: 0;
  border-right-width: 0;
  flex: 0.5;
  flex-direction: row;
`;


export const Cell = styled.TouchableOpacity`
  flex: 1;
`;

export const MiddleCell = styled.View`
  flex: 1;
  border: 1px solid yellow;
  border-top-width: 0;
  border-bottom-width: 0;
`;
