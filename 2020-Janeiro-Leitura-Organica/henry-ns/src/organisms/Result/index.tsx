import React, { FC } from 'react';

import ExternalLink from '~/atoms/ExternalLink';

import celebrating from '~/assets/celebrating.svg';

import { Container } from './styles';

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
      <p>Insatisfeito com o resultado?</p>
      <ExternalLink href="https://leituraorganica.com.br/">
        Aprenda como ler até 3 vezes mais rápido.
      </ExternalLink>
    </div>
  </Container>
);

export default Result;
