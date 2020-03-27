import React, { FC } from 'react';

import ExternalLink from '../../atoms/ExternalLink';

import { Container, Heart } from './styles';

const Footer: FC = () => (
  <Container>
    <p>
      <ExternalLink href="https://leituraorganica.com.br/">
        Leitura Orgânica
      </ExternalLink>
      {'  © 2020, todos os direitos reservados'}
    </p>
    <p>
      {'Site feito com '}
      <Heart />
      {' por '}
      <ExternalLink href="https://thehenry.dev/">Henrique Miranda</ExternalLink>
    </p>
  </Container>
);

export default Footer;
