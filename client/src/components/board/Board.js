import React, {
  useCallback, useEffect,
  useRef, useState, useContext,
} from 'react';
import './Board.css';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import ColorPicker from './Color-picker/Color-picker';
import BoardPropTypes from '../../proptypes/board-proptypes';
import { ThemeContext } from '../../context/theme';
import { checkRights, delBoard, patchPixelFromBoard } from '../../services/APIService';
import trash from '../../assets/trash.png';

export default function Board({ board }) {
  const refCanvas = useRef(null);
  const pixelSize = 12;
  const pixelBorderColor = '#D3D3D3';
  const [color, setColor] = useState('#000000');
  const [error, setError] = useState('');
  const theme = useContext(ThemeContext);

  const [upperRights, setUpperRights] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      // eslint-disable-next-line no-underscore-dangle
      setUpperRights((await checkRights(board._id)).data.message);
    };
    loadData().then();
  }, []);

  const drawPixel = useCallback(async (pixel) => {
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

  const generateBoard = () => {
    board.pixels.forEach((pixel) => {
      drawPixel(pixel);
    });
  };

  const getMousePos = (evt) => {
    const rect = refCanvas.current.getBoundingClientRect();
    const scaleX = refCanvas.current.width / rect.width;
    const scaleY = refCanvas.current.height / rect.height;
    console.log(scaleX);
    console.log(scaleY);
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
    console.log(clickedPixel);
    clickedPixel.color = color;
    if (board.isClosed) {
      return;
    }
    const patchData = {
      color,
    };
    // eslint-disable-next-line no-underscore-dangle,max-len
    await patchPixelFromBoard(board._id, clickedPixel._id, patchData).then((res) => (res.data.success
      ? patchSucces(clickedPixel)
      : setError(res.data.message)));
  }, [drawPixel, board.pixels, color]);

  useEffect(() => {
    generateBoard();
  }, []);

  useEffect(() => {
    const canvas = refCanvas.current;
    canvas.addEventListener('click', handleClick, false);
    return () => canvas.removeEventListener('click', handleClick);
  }, [handleClick]);

  const callbackColor = (colorValue) => {
    setColor(colorValue);
  };

  const handleDelBoard = async () => {
    // eslint-disable-next-line no-underscore-dangle
    const res = await delBoard(board._id);
    if (res.data.success) {
      navigate('/');
    } else {
      setError(res.data.message);
    }
  };

  return board && (
    <div className={theme}>
      {upperRights && (
        <div className="d-flex justify-content-end m-4">
          <Button color="danger" onClick={() => handleDelBoard()}>
            <img src={trash} alt="mushroom" width="24" />
          </Button>
        </div>
      )}

      <h1>{board.pixelBoardname}</h1>
      <div className="d-flex justify-content-around flex-wrap my-3">
        <div className="board d-flex justify-content-center flex-wrap">
          <canvas
            id="myCanvas"
            ref={refCanvas}
            width={board.nbColumns * pixelSize}
            height={board.nbLines * pixelSize}
          />
          {!board.isClosed && (<ColorPicker parentCallback={callbackColor} />)}
        </div>
        <div>
          <div className="d-flex justify-content-start">
            <h6>Date de fin : </h6>
            <h6>{board.dateOfClosure}</h6>
          </div>
          <div className="d-flex justify-content-start">
            <h6>Taille : </h6>
            <h6>{board.nbLines}</h6>
          </div>
          <div className="d-flex justify-content-start">
            <h6>Interval de temps : </h6>
            <h6>{`${board.intervalPixel} s`}</h6>
          </div>
          <div className="d-flex justify-content-start">
            <p className="error-msg">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

Board.propTypes = {
  board: BoardPropTypes.isRequired,
};
