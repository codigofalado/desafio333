import React from 'react';

import p5 from 'p5';

import Layout from '../../components/Layout';
import { useConfig } from '../../hooks/config';

import * as S from './styles';

const Game: React.FC = () => {
  const { config } = useConfig();

  return (
    <Layout>
      <S.Container>
        <h1>Game</h1>
        <div id="game" />
      </S.Container>
    </Layout>
  );
};

export default Game;
