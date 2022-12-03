import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Board from '../components/board/Board';
import { getBoard } from '../services/APIService';
import { ThemeContext } from '../context/theme';

export default function ScreenBoard() {
  const [board, setBoard] = useState(undefined);
  const params = useParams();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    getBoard(params.id).then((resp) => {
      const respBoard = resp.data.message;
      setBoard(respBoard);
    });
  }, []);

  return (
    <div className={`py-5 ${theme}`}>
      {board && (<Board board={board} />)}
    </div>
  );
}
