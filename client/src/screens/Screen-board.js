import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Board from '../components/board/Board';
import { getBoard } from '../services/APIService';
import { ThemeContext } from '../context/theme';

// Vue correspondante à l'affiche du board unique
export default function ScreenBoard() {
  const [board, setBoard] = useState(undefined);
  const params = useParams();
  const theme = useContext(ThemeContext);

  // On récupère la board avec le serveur et le paramètre dans l'url
  // et on la passe au composant enfant
  useEffect(() => {
    getBoard(params.id).then((resp) => {
      const respBoard = resp.data.message;
      setBoard(respBoard);
    });
  }, []);

  return (
    <div className={`py-5 ${theme}`}>
      {board && (<Board board={board} side={400} />)}
    </div>
  );
}
