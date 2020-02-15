import React, { FC } from 'react';

import Button from '~/atoms/Button';

import book from '~/assets/book1.svg';

import { Container, ButtonGroup } from './styles';

const Home: FC = () => (
  <Container id="home">
    <div>
      <h1>Você já parou para calcular a sua velocidade de leitura?</h1>
      <ButtonGroup>
        <Button to="/teste">Fazer o Teste</Button>
        <Button to="/#sobre" secondary>
          Saiba mais
        </Button>
      </ButtonGroup>
    </div>
    <img src={book} alt="mulher lendo um livro" />
  </Container>
);

export default Home;
