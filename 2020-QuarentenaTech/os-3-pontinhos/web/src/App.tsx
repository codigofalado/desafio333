import React from 'react';

import AppProvider from './hooks';

import GlobalStyles from './styles/global';

const App: React.FC = () => {
  return (
    <AppProvider>
      <GlobalStyles />
      <h1>Hello World</h1>
    </AppProvider>
  );
};

export default App;
