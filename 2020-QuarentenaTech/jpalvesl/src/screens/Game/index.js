import React, { useState, useEffect } from 'react';

import { Container, Title, TicTacToe, Line, MiddleLine, Cell, MiddleCell, Text, Modal, ModalView, WinnerText, Bold, ModalButton, ButtonText, CentredView, Counter, ChooseTitle, Buttons, ChooseButton, ChooseText } from './styles';

var gameOver = false
var matrix = ['','','','','','','','','']
var newGame = 0

function Game() {
  const [chance, setChance] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [chooseModalVisible, setChooseModalVisible] = useState(true)

  useEffect(() => {
    setChooseModalVisible(true)
  }, [newGame])


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

    if (gameOver){
      setModalVisible(state => !state)
    }

    setChance(state => !state)
  }

  function handleRestartGame() {
    matrix = ['','','','','','','','','']
    gameOver = !gameOver
    newGame += 1
    setModalVisible(state => !state)
    setChance(state => !state)
  }

  function handleSelect(symbol) {
    setChance(symbol)
    setChooseModalVisible(false)
  }

  return (
    <Container>
      <Title>Jogo da velha</Title>

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <CentredView>
          <ModalView>
            <WinnerText>O jogador <Bold>{chance ? 'O' : 'X' }</Bold> venceu!</WinnerText>
            <ModalButton onPress={handleRestartGame}>
              <ButtonText>Jogar novamente</ButtonText>
            </ModalButton>

            <ModalButton onPress={() => alert('Deve fechar o app')}>
              <ButtonText>Sair do jogo</ButtonText>
            </ModalButton>
          </ModalView>
        </CentredView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={chooseModalVisible}
      >
        <CentredView>
          <ModalView style={{height: 200}}>
            <ChooseTitle>Escolha com qual jogar</ChooseTitle>

            <Buttons>
              <ChooseButton onPress={() => handleSelect(true)}>
                <ChooseText><Bold>X</Bold></ChooseText>
              </ChooseButton>

              <ChooseButton onPress={() => handleSelect(false)}>
                <ChooseText><Bold>O</Bold></ChooseText>
              </ChooseButton>
            </Buttons>
          </ModalView>
        </CentredView>
      </Modal>

      <Counter>N vitórias consecutivas</Counter>
    </Container>
  )
}

export default Game;