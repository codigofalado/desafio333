import React from 'react';

// Get components
  import Header from './components/Header/index';

// Pages
  import MainContent from './pages/main/index';
  import Sobre from './pages/sobre/index';
  import Footer from './pages/Footer/index';

// Css 
  import './reset.css';
  import './global.css';
  
function App() {
  return (
    <>
      <Header />
      <MainContent />
      <Sobre />
      <Footer />
    </>
  );
}

export default App;