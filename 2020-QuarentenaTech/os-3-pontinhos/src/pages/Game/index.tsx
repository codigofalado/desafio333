import React, { useRef, useEffect, useState } from 'react';

import P5 from 'p5';

import Layout from '../../components/Layout';
import { useConfig } from '../../hooks/config';
import SubTitle from '../../styles/SubTitle';
import { createSketch } from './sketch';

import { Container } from './styles';

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
      <Container>
        <section ref={boardRef} />
        <section>
          <div>
            <SubTitle>Próxima peça</SubTitle>
          </div>
          <div>
            <SubTitle>Nivel</SubTitle>
            <strong id="level" />
          </div>
          <div>
            <SubTitle>Pontos</SubTitle>
            <strong id="points" />
          </div>
        </section>
      </Container>
    </Layout>
  );
};

export default Game;
