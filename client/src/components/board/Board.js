import React, {
  useCallback, useEffect,
  useRef, useState, useContext,
} from 'react';
import './Board.css';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ColorPicker from './Color-picker/Color-picker';
import BoardPropTypes from '../../proptypes/board-proptypes';
import { ThemeContext } from '../../context/theme';
import { checkRights, delBoard, patchPixelFromBoard } from '../../services/APIService';
import trash from '../../assets/trash.png';
import heatMap from '../../assets/heat-map.png';
import HeatMap from './HeatMap';

// Création de la socket pour la mise à jour de la board en temps réel
const ws = new WebSocket('ws://localhost:3001');

// Composant pour afficher une board modifiable (sur laquelle on peut dessiner)
export default function Board({ board, side }) {
  const refCanvas = useRef(null);
  const pixelBorderColor = '#D3D3D3';
  const pixelSize = side / board.nbLines;
  const [color, setColor] = useState('#000000');
  const [error, setError] = useState('');
  const [showHeatMap, setShowHeatMap] = useState(false);
  const theme = useContext(ThemeContext);
  const [upperRights, setUpperRights] = useState(false);
  const navigate = useNavigate();

  // On vérifie que l'utilisateur est connecté et à les droits pour supprimer
  useEffect(() => {
    const loadData = async () => {
      setUpperRights((await checkRights(board._id)).data.success);
    };
    loadData().then();
  }, []);

  // Méthode pour dessiner un pixel sur le canvas (la board)
  const drawPixel = useCallback((pixel) => {
    refCanvas.current.getContext('2d').fillStyle = pixel.color;
    refCanvas.current.getContext('2d').strokeStyle = pixelBorderColor;
    refCanvas.current.getContext('2d')
      .strokeRect(
        pixel.posX * pixelSize,
        pixel.posY * pixelSize,
        pixelSize,
        pixelSize,
      );
    refCanvas.current.getContext('2d')
      .fillRect(
        (pixel.posX * pixelSize) + 1,
        (pixel.posY * pixelSize) + 1,
        pixelSize - 2,
        pixelSize - 2,
      );
    pixel.occurrence += 1; // eslint-disable-line no-param-reassign
  }, []);

  // On récupére le message du server et on update le pixel si nécessaire
  ws.onmessage = (evt) => {
    const message = JSON.parse(evt.data);
    if (message.pixelBoardId === board._id) {
      const pixelToUpdate = board.pixels.find((pixel) => pixel._id === message.pixelId);
      pixelToUpdate.color = message.color;
      drawPixel(pixelToUpdate);
    }
  };

  // Méthode pour dessiner une board dans le canvas
  const generateBoard = () => {
    board.pixels.forEach((pixel) => {
      drawPixel(pixel);
    });
  };

  // Méthode pour récupérer la position de la souris sur le canvas
  const getMousePos = (evt) => {
    const rect = refCanvas.current.getBoundingClientRect();
    const scaleX = refCanvas.current.width / rect.width;
    const scaleY = refCanvas.current.height / rect.height;
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY,
    };
  };

  // Méthode pour mettre à jour le pixel, une fois que l'action a été approuvé par le serveur
  const patchSucces = (clickedPixel) => {
    drawPixel(clickedPixel);
    setError('');
  };

  // Callback pour gérer le click sur le canvas, on récupère le pixel concerné
  // et on le met à jour si c'est possible
  const handleClick = useCallback(async (evt) => {
    const getPixel = (x, y) => board.pixels.find((pixel) => pixel.posX === x && pixel.posY === y);
    const mousePos = getMousePos(evt);
    const x = Math.floor(mousePos.x / pixelSize);
    const y = Math.floor(mousePos.y / pixelSize);
    const clickedPixel = getPixel(x, y);
    clickedPixel.color = color;
    if (board.isClosed) {
      return;
    }
    const patchData = {
      color,
    };
    await patchPixelFromBoard(board._id, clickedPixel._id, patchData)
      .then((res) => (res.data.success ? patchSucces(clickedPixel) : setError(res.data.message)));
  }, [drawPixel, board.pixels, color]);

  // Méthode pour regénérer la board lorsqu'on affiche plus la heatmap
  useEffect(() => {
    if (!showHeatMap) {
      generateBoard();
    }
  }, [showHeatMap]);

  // On génére la board une fois que la pixelSize est bien définie
  useEffect(() => {
    if (pixelSize) {
      generateBoard();
    }
  }, [pixelSize]);

  // UseEffect pour gérer l'event listener sur le canvas
  useEffect(() => {
    const canvas = refCanvas.current;
    canvas.addEventListener('click', handleClick, false);
    return () => canvas.removeEventListener('click', handleClick);
  }, [handleClick]);

  // Callback passé au color picker pour récupérer la couleur choisie
  const callbackColor = (colorValue) => {
    setColor(colorValue);
  };

  // Requête vers le serveur pour supprimer une board
  const handleDelBoard = async () => {
    const res = await delBoard(board._id);
    if (res.data.success) {
      navigate('/');
    } else {
      setError(res.data.message);
    }
  };

  // Modification de l'état de showHeatMap avec le bouton associé
  const handleShowHeatMap = () => {
    setShowHeatMap(!showHeatMap);
  };

  // Méthode pour télécharger la pixel board
  const handleChartDownload = () => {
    const url = refCanvas.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${board.pixelBoardname}.png`;
    link.href = url;
    link.click();
  };

  return board && (
    <div className={theme}>

      <div className="d-flex justify-content-end m-4">
        <button type="button" className="mx-2 no-border" color="danger" onClick={() => handleShowHeatMap()}>
          <img src={heatMap} alt="heatmap" />
        </button>
        {upperRights && (
          <Button className="mx-2" color="danger" onClick={() => handleDelBoard()}>
            <img src={trash} alt="trash" width="24" />
          </Button>
        )}
      </div>

      <h1>{board.pixelBoardname}</h1>

      <div className="row mx-0 my-5 justify-content-center">
        <div className="row mx-0 col-sm-10 m-auto">
          {showHeatMap ? <HeatMap board={board} side={side} /> : (
            <canvas
              className="col-md-6 p-0 m-auto"
              id="myCanvas"
              ref={refCanvas}
              width={board.nbColumns * pixelSize}
              height={board.nbLines * pixelSize}
            />
          )}
          <div className="col-md-3 col-10 text-start">
            {!board.isClosed && !showHeatMap && (<ColorPicker parentCallback={callbackColor} />)}
            <button type="button" className="mt-2 btn btn-success" onClick={() => handleChartDownload()}>Télécharger</button>
          </div>
        </div>
        <div className="row mx-0 my-5 justify-content-center text-start">
          <div className="row mx-0 col-12 col-sm-10 col-md-8 col-xl-6">
            <div className="col-4">
              <h6>Date de fin</h6>
              <h6>{board.dateOfClosure}</h6>
            </div>
            <div className="col-4">
              <h6>Taille</h6>
              <h6>
                {board.nbLines}
                x
                {board.nbLines}
              </h6>
            </div>
            <div className="col-4">
              <h6>Interval de temps</h6>
              <h6>{`${board.intervalPixel} s`}</h6>
            </div>
          </div>
        </div>
        <div className="row mx-0 my-2 justify-content-center text-start">
          <div className="row mx-0 col-12 col-sm-10 col-md-8 col-xl-6">
            <div className="col-4">
              <h6>Auteur</h6>
              <h6>{board.author}</h6>
            </div>
            <div className="col-8 text-center">
              <p className="error-msg">{error}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Board.propTypes = {
  board: BoardPropTypes.isRequired,
  side: PropTypes.number.isRequired,
};
