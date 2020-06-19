import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/themes';
import { ConfigProvider } from './config';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ConfigProvider>{children}</ConfigProvider>
  </ThemeProvider>
);

export default AppProvider;
