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

const ws = new WebSocket('ws://localhost:3001');

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

  useEffect(() => {
    const loadData = async () => {
      setUpperRights((await checkRights(board._id)).data.success);
    };
    loadData().then();
  }, []);

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

  ws.onmessage = (evt) => {
    const message = JSON.parse(evt.data);
    if (message.pixelBoardId === board._id) {
      const pixelToUpdate = board.pixels.find((pixel) => pixel._id === message.pixelId);
      pixelToUpdate.color = message.color;
      drawPixel(pixelToUpdate);
    }
  };

  const generateBoard = () => {
    board.pixels.forEach((pixel) => {
      drawPixel(pixel);
    });
  };

  const getMousePos = (evt) => {
    const rect = refCanvas.current.getBoundingClientRect();
    const scaleX = refCanvas.current.width / rect.width;
    const scaleY = refCanvas.current.height / rect.height;
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY,
    };
  };

  const patchSucces = (clickedPixel) => {
    drawPixel(clickedPixel);
    setError('');
  };

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

  useEffect(() => {
    if (!showHeatMap) {
      generateBoard();
    }
  }, [showHeatMap]);

  useEffect(() => {
    if (pixelSize) {
      generateBoard();
    }
  }, [pixelSize]);

  useEffect(() => {
    const canvas = refCanvas.current;
    canvas.addEventListener('click', handleClick, false);
    return () => canvas.removeEventListener('click', handleClick);
  }, [handleClick]);

  const callbackColor = (colorValue) => {
    setColor(colorValue);
  };
  const handleDelBoard = async () => {
    const res = await delBoard(board._id);
    if (res.data.success) {
      navigate('/');
    } else {
      setError(res.data.message);
    }
  };
  const handleShowHeatMap = () => {
    setShowHeatMap(!showHeatMap);
  };

  const handleChartDownload = () => {
    const url = refCanvas.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${board.pixelBoardname}.png`;
    link.href = url;
    link.click();
    link.del();
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
        <div className="row mx-0 my-5 justify-content-center text-start">
          <div className="row mx-0 col-12 col-sm-10 col-md-8 col-xl-6">
            <div className="col-12 text-center">
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
