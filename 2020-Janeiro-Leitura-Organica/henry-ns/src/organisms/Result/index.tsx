import React, { FC } from 'react';

import celebrating from '~/assets/celebrating.svg';

import { Container, Anchor } from './styles';

interface Props {
  ppm?: number;
}

const Result: FC<Props> = ({ ppm }) => (
  <Container>
    <img src={celebrating} alt="comemorando" />
    <div>
      <h1>Parabéns!!!</h1>
      <p>
        Sua velocidade de leitura é de <strong>{ppm ?? '000'} PPM</strong>
      </p>
      <h2>Insatisfeito com o resultado?</h2>
      <p>
        <Anchor href="https://leituraorganica.com.br/">Clique aqui</Anchor>
        {' para aprender como ler até 3 vezes mais rápido.'}
      </p>
    </div>
  </Container>
);

export default Result;
