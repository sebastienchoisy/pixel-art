import React from 'react';
import Board from '../components/board/Board';

export default function ScreenBoard() {
  return (
    <div className="board-container">
      <Board colsNb={50} linesNb={50} />
    </div>
  );
}
