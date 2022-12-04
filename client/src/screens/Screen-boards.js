import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { getBoards } from '../services/APIService';
import Loader from '../components/loader/Loader';
import BoardDisplay from '../components/board/Board-display';
import { ThemeContext } from '../context/theme';

// Vue correspondante à l'affichage de la liste des boards
export default function ScreenBoards({ isLogged }) {
  const [boards, setBoards] = useState([]);
  const [currentBoards, setCurrentBoards] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  // On fitre les boards pour récupérer les boards qui ne sont pas fermées
  const checkCurrentBoards = () => {
    const newBoards = [];
    boards.forEach((board) => {
      if (board.isClosed === !isOpen && String(board.pixelBoardname).includes(nameFilter)) {
        newBoards.push(board);
      }
    });
    setCurrentBoards(newBoards);
  };

  // On récupère toutes les boards à partir du serveur
  useEffect(() => {
    const loadData = async () => {
      setBoards((await getBoards()).data.message);
    };
    loadData().then(() => setIsLoading(false));
  }, []);

  // Méthode pour rediriger vers l'affichage d'une board spécifique
  const navBoard = (id) => {
    navigate(`/board/${id}`);
  };

  // On filtre
  useEffect(
    () => {
      checkCurrentBoards();
    },
    [boards, isOpen, nameFilter],
  );
  const renderBoardItem = (board) => (
    <div key={board.pixelBoardname} className="mb-5">
      {isOpen === !board.isClosed && (
      <div className="Card card m-2" onKeyDown={() => navBoard(board._id)} role="button" tabIndex={board.pixelBoardname}>
        <BoardDisplay board={board} side={300} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{board.pixelBoardname}</h5>
          <div className="card-subtitle m-2">
            <div className="d-flex justify-content-between mb-1">
              <p className="card-subtitle">Fermeture : </p>
              <p className="card-subtitle">{board.dateOfClosure}</p>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <p className="card-subtitle">Interval: </p>
              <p className="card-subtitle">{`${board.intervalPixel} s`}</p>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <p className="card-subtitle">Édition multiple : </p>
              <p className="card-subtitle">{board.multipleDrawPixel ? 'Oui' : 'Non'}</p>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
  const changeNameFilter = (evt) => {
    setNameFilter(evt.target.value);
  };

  const changeOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={theme}>
      {isLoading ? <Loader />
        : (
          <div className="pt-5 pb-5">
            <h1>Boards</h1>
            <div className="d-flex justify-content-around align-items-center flex-wrap my-5">
              {isLogged && (
              <div className="m-2">
                <Button onClick={() => navigate('/boardform')}>Créer une nouvelle grille</Button>
              </div>
              )}
              <div className="m-2 w-50">
                <Input onChange={changeNameFilter} placeholder="Chercher par nom de grille" />
              </div>
              <div className="m-2">
                <Button color={isOpen ? 'success' : 'danger'} onClick={() => changeOpen()}>{isOpen ? 'Boards ouverts' : 'Boards fermés'}</Button>
              </div>
            </div>
            <div className="d-flex justify-content-around flex-wrap">
              {currentBoards.map((board) => renderBoardItem(board))}
            </div>
          </div>
        )}
    </div>
  );
}

ScreenBoards.propTypes = {
  isLogged: PropTypes.bool,
};

ScreenBoards.defaultProps = {
  isLogged: false,
};
