import React, { useContext } from 'react';
import Board from '../components/board/Board';
import { ThemeContext } from '../context/ThemeContext';

export default function ScreenBoard() {
  const theme = useContext(ThemeContext);
  return (
    <div className="board-container" style={theme}>
      <Board colsNb={50} linesNb={50} />
    </div>
  );
}
