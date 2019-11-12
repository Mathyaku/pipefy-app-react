import React from 'react';


import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


import Header from './components/Header';
import Board from './components/Board';

import './style.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header></Header>
      <Board></Board>
    </DndProvider>
  );
}

export default App;
