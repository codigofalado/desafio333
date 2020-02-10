import React, { FC } from 'react';

import { Container } from './styles';

interface Props {
  secondary?: boolean;
  href: string;
}

const Button: FC<Props> = ({ children, secondary, href }) => (
  <Container href={href} secondary={secondary}>
    {children}
  </Container>
);

export default Button;
