import React, { useEffect, useContext, useState } from 'react';
import {
  getBoardsNb, getClosedBoards, getPopularBoards, getRecentBoards, getUsersNb,
} from '../services/APIService';
import BoardCarousel from '../components/carousel/Board-carousel';
import Stats from '../components/stats/Stats';
import Loader from '../components/loader/Loader';
import { ThemeContext } from '../context/theme';

export default function ScreenAccueil() {
  const [closedBoards, setClosedBoards] = useState(null);
  const [popularBoards, setPopularBoards] = useState(null);
  const [recentBoards, setRecentBoards] = useState(null);
  const [usersNb, setUsersNb] = useState(null);
  const [boardsNb, setBoardsNb] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const loadData = async () => {
      setClosedBoards((await getClosedBoards()).data.message);
      setPopularBoards((await getPopularBoards()).data.message);
      setRecentBoards((await getRecentBoards()).data.message);
      setUsersNb((await getUsersNb()).data.message);
      setBoardsNb((await getBoardsNb()).data.message);
    };
    loadData().then(() => setIsLoading(false));
  }, []);
  return (
    <div className={theme}>
      {isLoading ? <Loader />
        : (
          <>
            <div className="row flex-row pt-5 w-100">
              <div className="col-md mb-3 fw-light">
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
                  <Stats boardsNb={boardsNb} usersNb={usersNb} />
                </div>
              </div>
              <div className="col-md align-content-center mb-3 ">
                <span className="fw-bold">Récentes</span>
                <BoardCarousel boards={recentBoards} />
              </div>
            </div>
            <div className="row flex-row mt-5 w-100">
              <div className="col-md mb-3">
                <span className="fw-bold">Populaires</span>
                <BoardCarousel boards={popularBoards} />
              </div>
              <div className="col-md pb-3">
                <span className="fw-bold">Terminées</span>
                <BoardCarousel boards={closedBoards} />
              </div>
            </div>
          </>
        )}
    </div>
  );
}
