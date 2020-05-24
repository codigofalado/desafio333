import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #860c4e;
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
  background-color: #000;
`;

export const Line = styled.View`
  flex: 0.5;
  flex-direction: row;
`;

export const MiddleLine = styled.View`
  border: 5px solid #860c4e;
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
  border: 5px solid #860c4e;
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

export const CentredBlurView = styled(BlurView)`
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


export const ChooseTitle = styled.Text`
  font-size: 24px;
  text-align: center;
  margin-bottom: 8px;
`;

export const Buttons = styled.View`
  flex-direction: row;
`;

export const ChooseButton = styled.TouchableOpacity`
  background: red;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  margin-right: 10px;
`;

export const ChooseText = styled.Text`
  font-size: 30px;
  color: #fff;
`;

export const VelhaText = styled.Text`
  font-size: 20px;
  color: #000;
`;

export const FlipText = styled.Text`
  font-size: 16px;
  color: #000;
`;

