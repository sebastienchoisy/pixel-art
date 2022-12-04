import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import BoardPropTypes from '../../proptypes/board-proptypes';

export default function HeatMap({ board, side }) {
  const refCanvas = useRef(null);
  const pixelSize = side / board.nbLines;
  const pixelBorderColor = '#D3D3D3';
  const [occurenceMax, setOccurenceMax] = useState(null);

  // Méthode pour générer la couleur selon l'occurence
  const processColor = (pixel) => {
    const colorDiff = Math.round(255 * (pixel.occurence / occurenceMax));
    return `rgb(255, ${255 - colorDiff}, ${255 - colorDiff})`;
  };

  // Méthode pour dessiner un pixel
  const drawPixel = (pixel) => {
    refCanvas.current.getContext('2d').fillStyle = processColor(pixel);
    refCanvas.current.getContext('2d').strokeStyle = pixelBorderColor;
    refCanvas.current.getContext('2d').strokeRect(pixel.posX * pixelSize, pixel.posY * pixelSize, pixelSize, pixelSize);
    refCanvas.current.getContext('2d').fillRect((pixel.posX * pixelSize) + 1, (pixel.posY * pixelSize) + 1, pixelSize - 2, pixelSize - 2);
  };

  // Méthode pour générer la heatMap dans le canvas
  const generateBoard = () => {
    board.pixels.forEach((pixel) => {
      drawPixel(pixel);
    });
  };

  // Méthode pour set l'occurence max de la board
  const processMaxOccurence = () => {
    let max = 1;
    board.pixels.forEach((pixel) => {
      if (max < pixel.occurence) {
        max = pixel.occurence;
      }
    });
    setOccurenceMax(max);
  };
  // On calcule l'occurence max dans un premier useEffect
  useEffect(() => {
    processMaxOccurence();
  }, []);

  // On génére la board une fois que l'occurence max est définie
  useEffect(() => {
    if (occurenceMax) {
      generateBoard();
    }
  }, [occurenceMax]);
  return board && (
  <canvas
    id="myHeatMapCanvas"
    className="col-md-6 p-0 m-auto"
    ref={refCanvas}
    width={board.nbColumns * pixelSize}
    height={board.nbLines * pixelSize}
  />
  );
}

HeatMap.propTypes = {
  board: BoardPropTypes.isRequired,
  side: PropTypes.number.isRequired,
};
