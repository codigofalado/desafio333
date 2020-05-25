import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './hooks';

import Routes from './routes';

import GlobalStyles from './styles/global';

const App: React.FC = () => {
  return (
    <AppProvider>
      <GlobalStyles />
      <Router>
        <Routes />
      </Router>
    </AppProvider>
  );
};

export default App;
