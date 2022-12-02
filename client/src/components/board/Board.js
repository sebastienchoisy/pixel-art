import React, {
  useCallback, useEffect,
  useRef, useState,
} from 'react';
import './Board.css';
import ColorPicker from './Color-picker/Color-picker';
import BoardPropTypes from '../../proptypes/board-proptypes';
import { patchPixelFromBoard } from '../../services/APIService';

export default function Board({ board }) {
  const refCanvas = useRef(null);
  const pixelSize = 12;
  const pixelBorderColor = '#D3D3D3';
  const [color, setColor] = useState('#000000');
  const [error, setError] = useState('');
  console.log(board);

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

  return board && (
    <div>
      <h1>{board.pixelBoardname}</h1>
      <h4>{board.dateOfClosure}</h4>
      <p>{error}</p>
      <div className="board d-flex justify-content-around">
        <div>
          <canvas
            id="myCanvas"
            ref={refCanvas}
            width={board.nbColumns * pixelSize}
            height={board.nbLines * pixelSize}
          />
        </div>
        <div>
          {!board.isClosed && (<ColorPicker parentCallback={callbackColor} />)}
        </div>
      </div>
    </div>
  );
}

Board.propTypes = {
  board: BoardPropTypes.isRequired,
};
