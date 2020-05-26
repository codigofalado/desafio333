import React from 'react';

import Header from '../../components/Header';

import * as S from './styles';

const Help: React.FC = () => {
  return (
    <>
      <Header />
      <S.Container>
        <h1>Ajuda</h1>

        <S.SubTitle>Teclas de Movimento</S.SubTitle>
        <ul>
          <li>
            <strong>Seta para direita</strong>
            <span>: Movimenta a peça para a direita.</span>
          </li>
          <li>
            <strong>Seta para esquerda</strong>
            <span>: Movimenta a peça para a esquerda.</span>
          </li>
          <li>
            <strong>Seta para baixo</strong>
            <span>: Derruba a peça.</span>
          </li>
        </ul>

        <S.SubTitle>Rotacionar a peça</S.SubTitle>
        <ul>
          <li>
            <strong>Seta para cima</strong>
            <span>: Rotaciona a peça no sentido horario.</span>
          </li>
          <li>
            <strong>Tecla A</strong>
            <span>: rotaciona no sentido horário.</span>
          </li>
          <li>
            <strong>Tecla B</strong>
            <span>: rotaciona no sentido anti-horário.</span>
          </li>
        </ul>

        <S.SubTitle>Play & Pause</S.SubTitle>
        <ul>
          <li>
            <strong>Tecla Q</strong>
            <span>: Movimenta a peça para a direita.</span>
          </li>
        </ul>
      </S.Container>
    </>
  );
};

export default Help;
