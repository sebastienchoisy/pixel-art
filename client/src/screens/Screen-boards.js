import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { getBoards } from '../services/APIService';
import Loader from '../components/loader/Loader';

export default function ScreenBoards() {
  const [boards, setBoards] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const loadData = async () => {
      setBoards((await getBoards()).data.message);
    };
    loadData().then(() => setIsLoading(false));
  }, []);
  const navBoard = (id) => {
    navigate(`/board/${id}`);
  };

  const renderBoardItem = (board) => (
    <div key={board.pixelBoardname}>
      {isOpen === !board.isClosed && (
        // eslint-disable-next-line no-underscore-dangle
        <Button onClick={() => navBoard(board._id)}>{board.pixelBoardname}</Button>)}
    </div>
  );
  const changeOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {isLoading ? <Loader />
        : (
          <>
            <h1>Boards</h1>
            <Button onClick={() => navigate('/boardform')}>Create New Board</Button>
            <div className="my-2">
              <Button color={isOpen ? 'success' : 'danger'} onClick={() => changeOpen()}>Filtrer</Button>
              {isOpen && (<p> Pixels boards ouverts</p>)}
              {!isOpen && (<p> Pixels boards fermés</p>)}
            </div>
            <div>
              {boards.map((board) => renderBoardItem(board))}
            </div>
          </>
        )}
    </div>
  );
}
