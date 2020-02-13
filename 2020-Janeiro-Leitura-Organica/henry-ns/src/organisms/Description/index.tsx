import React, { FC } from 'react';

import Button from '~/components/Button';

import bibliophile from '~/assets/bibliophile.svg';
import studying from '~/assets/studying.svg';

import { Container } from './styles';

const Description: FC = () => (
  <Container id="sobre">
    <div>
      <img src={bibliophile} alt="bibliófila" />
      <article>
        <h1>Título</h1>
        <p>
          Num mundo tão subjetivo quanto o da leitura, a velocidade de leitura é
          uma métrica objetiva que te permite saber como está a sua leitura
          nesse momento e te permite acompanhar a sua evolução!
        </p>
      </article>
    </div>

    <div>
      <article>
        <h1>Título</h1>
        <p>
          A medida mais utilizada para calcular a velocidade de leitura é
          Palavras por Minuto (<strong>PPM</strong>).
        </p>
        <p>
          Uma leitura em páginas por hora, por exemplo, não pode ser aplicada em
          qualquer livro (pois tem tamanhos diferentes de páginas), muito menos
          em artigos ou notícias.
        </p>
      </article>

      <img src={studying} alt="estudando" />
    </div>

    <h2>Que tal descobrir agora a sua velocidade de leitura?</h2>
    <Button href="#teste">Fazer o Teste</Button>
  </Container>
);

export default Description;
