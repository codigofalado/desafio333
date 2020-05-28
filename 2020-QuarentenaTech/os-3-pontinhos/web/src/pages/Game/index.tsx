import React, { useRef, useEffect, useState } from 'react';

import P5 from 'p5';

import Layout from '../../components/Layout';
import { useConfig } from '../../hooks/config';
import { createSketch } from './sketch';

import * as S from './styles';

const Game: React.FC = () => {
  const { config } = useConfig();

  const [, setGame] = useState<P5>();
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boardRef.current) {
      const sketch = createSketch(config);

      setGame(new P5(sketch, boardRef.current));
    }
  }, [config]);

  return (
    <Layout>
      <S.Container>
        <h1>Game</h1>
        <section ref={boardRef} />
        <section>
          <h1>Próxima peça</h1>
          <h1>Nivel </h1>
          <h1>Pontos </h1>
        </section>
      </S.Container>
    </Layout>
  );
};

export default Game;
