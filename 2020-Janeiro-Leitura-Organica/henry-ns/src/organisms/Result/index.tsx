import React, { useEffect, FC } from 'react';

import ShareButtons from '~/molecules/ShareButtons';

import celebrating from '~/assets/celebrating.svg';

import { Container, Anchor } from './styles';

interface Props {
  ppm?: number;
}

const Result: FC<Props> = ({ ppm }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <Container>
      <div>
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
      </div>
      <div>
        <h3>Compartilhe seu resultado</h3>
        <ShareButtons ppm={ppm ?? '000'} />
      </div>
    </Container>
  );
};

export default Result;
