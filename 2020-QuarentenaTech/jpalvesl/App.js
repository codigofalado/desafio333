import React from 'react';
import { StatusBar } from 'react-native';

import Navigation from './src/Navigation';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Navigation />
    </>
  );
}
