import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { Audio } from 'expo-av';

import koSound from '../../sounds/ko.mp3';
import failSound from '../../sounds/fail.mp3';

import { Container, Title, TicTacToe, Line, MiddleLine, Cell, MiddleCell, Text, Modal, ModalView, WinnerText, Bold, ModalButton, ButtonText, CentredView,CentredBlurView, ChooseTitle, Buttons, ChooseButton, ChooseText, VelhaText, FlipText  } from './styles';

var gameOver = false
var matrix = ['','','','','','','','','']
var newGame = 0

function Game() {
  const [chance, setChance] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [chooseModalVisible, setChooseModalVisible] = useState(true)
  const [velhaModalVisible, setVelhaModalVisible] = useState(false)
  const [coin, setCoin] = useState('')

  useEffect(() => {
    setChooseModalVisible(true)
  }, [newGame])


  async function handlePlay(player, cell) {
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

    else {
      let counter = 0
      for (const cell of matrix) {
        if (cell !== '') counter++
      }
      if (counter === 9) {
        setVelhaModalVisible(true)
        let SoundObject = new Audio.Sound()
        try {
          await SoundObject.loadAsync(failSound)
          await SoundObject.playAsync()
        } catch (error) {
          alert('Erro ao tocar failSong')
        }
      }
    }
    setChance(state => !state)
    
    if (gameOver){
      setModalVisible(state => !state)

      let SoundObject = new Audio.Sound()
      try {
        await SoundObject.loadAsync(koSound)
        await SoundObject.playAsync()
      } catch (error) {
        alert('Erro ao tocar KO')
      }
    }
  }

  function handleRestartGame() {
    matrix = ['','','','','','','','','']
    gameOver = false
    newGame += 1
    setModalVisible(false)
    setVelhaModalVisible(false)
    setCoin('')
  }

  function handleSelect(symbol) {
    setChance(symbol)
    setChooseModalVisible(false)
  }

  function flipCoin() {
      const number = Math.floor(Math.random() * 2)

      if (number === 1) {
        setCoin('O')
      }
      else {
        setCoin('X')
      }
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
        <CentredBlurView intensity={100} tint="dark">
          <ModalView>
            <WinnerText>O jogador <Bold>{chance ? 'O' : 'X' }</Bold> venceu!</WinnerText>
            <ModalButton onPress={handleRestartGame}>
              <ButtonText>Jogar novamente</ButtonText>
            </ModalButton>

            <ModalButton onPress={() => BackHandler.exitApp()}>
              <ButtonText>Sair do jogo</ButtonText>
            </ModalButton>
          </ModalView>
        </CentredBlurView>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={velhaModalVisible}
      >
        <CentredBlurView intensity={100} tint="dark">
          <ModalView>
            <VelhaText>Deu velha</VelhaText>
            <ModalButton onPress={flipCoin}>
              <ButtonText>Girar modeda</ButtonText>
            </ModalButton>
            <ModalButton onPress={handleRestartGame}>
              <ButtonText>Jogar novamente</ButtonText>
            </ModalButton>

            <FlipText>{coin ? `O jogador ${coin} venceu` : '?'}</FlipText>
          </ModalView>
        </CentredBlurView>
      </Modal>
    </Container>
  )
}

export default Game;