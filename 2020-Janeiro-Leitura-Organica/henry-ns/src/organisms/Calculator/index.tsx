import React, { FC } from 'react';

import { Container } from './styles';

interface Props {
  data: string;
}

const Calculator: FC<Props> = ({ data }) => (
  <Container>
    <article>{data}</article>
  </Container>
);

export default Calculator;
