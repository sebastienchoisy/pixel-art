import React, { useEffect, useRef, useState } from 'react';

import BoardPropTypes from '../../proptypes/board-proptypes';

export default function HeatMap({ board }) {
  const refCanvas = useRef(null);
  const pixelSize = 12;
  const pixelBorderColor = '#D3D3D3';
  const [occurenceMax, setOccurenceMax] = useState(null);

  const processColor = (pixel) => {
    const colorDiff = Math.round(255 * (pixel.occurence / occurenceMax));
    return `rgb(255, ${255 - colorDiff}, ${255 - colorDiff})`;
  };
  const drawPixel = (pixel) => {
    refCanvas.current.getContext('2d').fillStyle = processColor(pixel);
    refCanvas.current.getContext('2d').strokeStyle = pixelBorderColor;
    refCanvas.current.getContext('2d').strokeRect(pixel.posX * pixelSize, pixel.posY * pixelSize, pixelSize, pixelSize);
    refCanvas.current.getContext('2d').fillRect((pixel.posX * pixelSize) + 1, (pixel.posY * pixelSize) + 1, pixelSize - 2, pixelSize - 2);
  };

  const generateBoard = () => {
    board.pixels.forEach((pixel) => {
      drawPixel(pixel);
    });
  };
  const processMaxOccurence = () => {
    let max = 1;
    board.pixels.forEach((pixel) => {
      if (max < pixel.occurence) {
        max = pixel.occurence;
      }
    });
    setOccurenceMax(max);
  };
  useEffect(() => {
    processMaxOccurence();
  }, []);
  useEffect(() => {
    if (occurenceMax) {
      generateBoard();
    }
  }, [occurenceMax]);
  return board && (
    <div>
      <canvas
        id="myCanvas"
        ref={refCanvas}
        width={board.nbColumns * pixelSize}
        height={board.nbLines * pixelSize}
      />
    </div>
  );
}

HeatMap.propTypes = {
  board: BoardPropTypes.isRequired,
};
