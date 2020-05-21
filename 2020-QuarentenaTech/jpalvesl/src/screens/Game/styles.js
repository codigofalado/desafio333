import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 36px;
  margin-bottom: 24px;
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
  align-items: center;
  justify-content: center;
`;

export const MiddleCell = styled.View`
  flex: 1;
  border: 1px solid yellow;
  border-top-width: 0;
  border-bottom-width: 0;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 30px;
`;

export const Modal = styled.Modal``;

export const CentredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

export const ModalView = styled.View`
  background-color: #fff;
  align-items: center;
  justify-content: center;
  height: 250px;
  width: 250px;
  border-radius: 16px;
`;

export const WinnerText = styled.Text`
  color: #000;
  font-size: 24px;
  margin-bottom: 8px;
`;

export const Bold = styled.Text`
  font-weight: bold;
`;


export const ModalButton = styled.TouchableOpacity`
  background-color: #00f;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 20px;
  border-radius: 32px;
  margin: 4px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const Counter = styled.Text`
  text-align: right;
  color: #fff;
`;