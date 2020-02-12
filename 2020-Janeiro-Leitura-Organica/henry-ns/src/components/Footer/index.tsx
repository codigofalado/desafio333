import React, { FC } from 'react';

import ExternalLink from '../ExternalLink';

import { Container } from './styles';

const Footer: FC = () => (
  <Container>
    <p>
      <ExternalLink href="https://leituraorganica.com.br/">
        Leitura Orgânica
      </ExternalLink>
      {'  © 2020, todos os direitos resevados'}
    </p>
    <p>
      {'Site feito '}
      <strong>{'<3'}</strong>
      {' com por '}
      <ExternalLink href="https://thehenry.dev/">Henrique Miranda</ExternalLink>
    </p>
  </Container>
);

export default Footer;
