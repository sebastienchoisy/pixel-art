import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import boardProptypes from '../../proptypes/board-proptypes';

// Composant pour afficher une board sans la logique de dessin
export default function BoardDisplay({ board, side }) {
  const refCanvas = useRef(null);
  const [pixelSize, setPixelSize] = useState(0);
  const pixelBorderColor = '#D3D3D3';

  // Méthode pour dessiner un pixel
  const drawPixel = (pixel) => {
    refCanvas.current.getContext('2d').fillStyle = pixel.color;
    refCanvas.current.getContext('2d').strokeStyle = pixelBorderColor;
    refCanvas.current.getContext('2d').strokeRect(pixel.posX * pixelSize, pixel.posY * pixelSize, pixelSize, pixelSize);
    refCanvas.current.getContext('2d').fillRect((pixel.posX * pixelSize) + 1, (pixel.posY * pixelSize) + 1, pixelSize - 2, pixelSize - 2);
  };

  // Méthode pour générer la board dans le canvas
  const generateBoard = () => {
    board.pixels.forEach((pixel) => {
      drawPixel(pixel);
    });
  };

  // On set la taille des pixels dans le useEffect
  useEffect(() => {
    setPixelSize(side / board.nbLines);
  }, [board]);

  // On crée la board une fois que la taille des pixels est définie
  useEffect(() => {
    if (pixelSize) {
      generateBoard();
    }
  }, [pixelSize]);
  return (
    <div>
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
  board: boardProptypes.isRequired,
  side: PropTypes.number.isRequired,
};
