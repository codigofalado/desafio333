import React from 'react';

import Layout from '../../components/Layout';
import SubTitle from '../../styles/SubTitle';

import { Container } from './styles';

const Help: React.FC = () => {
  return (
    <Layout>
      <Container>
        <h1>Ajuda</h1>

        <SubTitle>Teclas de Movimento</SubTitle>
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
            <span>: Faz a peça descer mais rápido.</span>
          </li>
          <li>
            <strong>Tecla D</strong>
            <span>: Derruba a peça.</span>
          </li>
        </ul>

        <SubTitle>Rotacionar a peça</SubTitle>
        <ul>
          <li>
            <strong>Seta para cima</strong>
            <span>: Rotaciona a peça no sentido horario.</span>
          </li>
          <li>
            <strong>Tecla A</strong>
            <span>: Rotaciona no sentido horário.</span>
          </li>
          <li>
            <strong>Tecla B</strong>
            <span>: Rotaciona no sentido anti-horário.</span>
          </li>
        </ul>

        <SubTitle>Play & Pause</SubTitle>
        <ul>
          <li>
            <strong>Tecla Q</strong>
            <span>: Muda entre o play e o pause no jogo.</span>
          </li>
        </ul>
      </Container>
    </Layout>
  );
};

export default Help;
