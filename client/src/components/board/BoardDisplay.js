import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import boardPropTypes from '../../propTypes/boardPropTypes';

export default function BoardDisplay({ board, side }) {
  const refCanvas = useRef(null);
  const [pixelSize, setPixelSize] = useState(0);
  const pixelBorderColor = '#D3D3D3';

  const drawPixel = (pixel) => {
    refCanvas.current.getContext('2d').fillStyle = pixel.color;
    refCanvas.current.getContext('2d').strokeStyle = pixelBorderColor;
    refCanvas.current.getContext('2d').strokeRect(pixel.posX * pixelSize, pixel.posY * pixelSize, pixelSize, pixelSize);
    refCanvas.current.getContext('2d').fillRect((pixel.posX * pixelSize) + 1, (pixel.posY * pixelSize) + 1, pixelSize - 2, pixelSize - 2);
  };

  const generateBoard = () => {
    board.pixels.forEach((pixel) => {
      drawPixel(pixel);
    });
  };

  useEffect(() => {
    setPixelSize(side / board.nbLines);
    generateBoard();
  }, [board]);
  return (
    <div>
      {/* eslint-disable-next-line no-underscore-dangle */}
      <Link to={`/board/${board._id}`} className="d-flex flex-column fit-content link m-auto">
        <span>{board.pixelBoardname}</span>
        <canvas
          id="myCanvas"
          ref={refCanvas}
          width={side}
          height={side}
        />
      </Link>
    </div>
  );
}

BoardDisplay.propTypes = {
  board: boardPropTypes.isRequired,
  side: PropTypes.number.isRequired,
};
