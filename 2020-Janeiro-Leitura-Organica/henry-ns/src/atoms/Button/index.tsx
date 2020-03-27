import React, { FC } from 'react';

import { Container } from './styles';

interface Props {
  secondary?: boolean;
  to: string;
}

const Button: FC<Props> = ({ children, secondary, to }) => (
  <Container to={to} secondary={secondary}>
    {children}
  </Container>
);

Button.defaultProps = {
  secondary: false,
};

export default Button;
