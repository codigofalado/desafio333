import React, { FC } from 'react';

import logo from '~/assets/logo.png';

import { Container } from './styles';

const Header: FC = () => (
  <Container>
    <img src={logo} alt="Leitura Orgânica" />
    <ul>
      <li>Leitura Orgânica</li>
      <li>Sobre</li>
      <li>Realizar teste</li>
    </ul>
  </Container>
);

export default Header;
