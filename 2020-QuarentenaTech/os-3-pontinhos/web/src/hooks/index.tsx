import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/themes';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default AppProvider;
