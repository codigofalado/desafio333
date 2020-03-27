import React, { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';

import theme from '../src/styles/theme';

interface Props {
  element: React.ReactNode;
}

export const wrapRootElement: FC<Props> = ({ element }) => (
  <HelmetProvider>
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
  </HelmetProvider>
);
