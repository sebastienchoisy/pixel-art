import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from '../components/board/Board';
import { getBoard } from '../services/APIService';

export default function ScreenBoard() {
  const [board, setBoard] = useState(undefined);
  const params = useParams();

  useEffect(() => {
    getBoard(params.id).then((resp) => {
      const respBoard = resp.data.message;
      setBoard(respBoard);
    });
  }, []);

  return (
    <div className="board-container">
      {board && (<Board board={board} />)}
    </div>
  );
}
