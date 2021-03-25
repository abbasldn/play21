import React from 'react';
import Gameboard from './components/Gameboard';
import { TwentyOneProvider } from './context/21context';

function App() {
  return (
    <TwentyOneProvider>
      <Gameboard />
    </TwentyOneProvider>
  );
}

export default App;
