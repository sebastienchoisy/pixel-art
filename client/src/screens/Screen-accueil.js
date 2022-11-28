import React, { useEffect, useState } from 'react';
import {
  getBoardsNb, getClosedBoards, getPopularBoards, getRecentBoards, getUsersNb,
} from '../services/APIService';
import BoardCarousel from '../components/carousel/Board-carousel';
import Stats from '../components/stats/Stats';

export default function ScreenAccueil() {
  const [closedBoards, setClosedBoards] = useState(null);
  const [popularBoards, setPopularBoards] = useState(null);
  const [recentBoards, setRecentBoards] = useState(null);
  const [usersNb, setUsersNb] = useState(null);
  const [boardsNb, setBoardsNb] = useState(null);
  useEffect(() => {
    getClosedBoards().then((resp) => setClosedBoards(resp.data));
    getPopularBoards().then((resp) => setPopularBoards(resp.data));
    getRecentBoards().then((resp) => setRecentBoards(resp.data));
    getUsersNb().then((resp) => setUsersNb(resp.data));
    getBoardsNb().then((resp) => setBoardsNb(resp.data));
  }, []);
  return (
    <div>
      <div className="row flex-row mt-5">
        <div className="col">
          <div>
            <span>Bienvenue sur Pixel-Art</span>
            <br />
            <span>
              Veuillez remplir les différentes grilles présentes sur notre application !
              <br />
              Il suffit de créer un compte et/ou se connecter et c&apos;est parti !
            </span>
          </div>
          <div className="mt-4">
            {boardsNb && usersNb && (<Stats boardsNb={boardsNb} usersNb={usersNb} />)}
          </div>
        </div>
        {recentBoards?.length > 0 && (
        <div className="col align-content-center">
          <span className="fw-bold"> Les boards les plus récentes</span>
          <BoardCarousel boards={recentBoards} />
        </div>
        )}
      </div>
      <div className="row flex-row mt-5">
        {popularBoards?.length && (
          <div className="col">
            <span className="fw-bold"> Les boards les plus populaires </span>
            <BoardCarousel boards={popularBoards} />
          </div>
        )}
        {closedBoards?.length ? (
          <div className="col">
            <span className="fw-bold"> Les boards terminés </span>
            <BoardCarousel boards={closedBoards} />
          </div>
        ) : <div className="col"><span className="fw-bold"> Aucune board terminée pour le moment </span></div>}
      </div>
    </div>
  );
}
