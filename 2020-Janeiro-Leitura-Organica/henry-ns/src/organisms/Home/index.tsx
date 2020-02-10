import React, { FC } from 'react';

import Button from '~/components/Button';

import book from '~/assets/book1.svg';

import { Container, ButtonGroup } from './styles';

const Home: FC = () => (
  <Container id="home">
    <div>
      <h1>Você já parou para calcular a sua velocidade de leitura?</h1>
      <ButtonGroup>
        <Button href="#teste">Fazer o Teste</Button>
        <Button href="#sobre" secondary>
          Saiba mais
        </Button>
      </ButtonGroup>
    </div>
    <img src={book} alt="mulher lendo um livro" />
  </Container>
);

export default Home;
