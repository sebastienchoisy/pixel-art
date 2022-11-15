import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import './Board.css';
import PropTypes from 'prop-types';
import Pixel from './Pixel';
import ColorPicker from './ColorPicker';

export default function Board(props) {
  const refCanvas = useRef(null);
  const pixelSize = 12;
  const pixelBorderColor = '#D3D3D3';
  const [pixels, setPixels] = useState([]);
  const [color, setColor] = useState('#000000');
  const { linesNb, colsNb } = props;

  const generateEmptyPixels = () => {
    const pixelTab = [];
    for (let i = 0; i < linesNb; i += 1) {
      for (let j = 0; j < colsNb; j += 1) {
        const newPixel = new Pixel(i, j);
        pixelTab.push(newPixel);
      }
    }
    return pixelTab;
  };

  const drawPixel = useCallback((pixel) => {
    refCanvas.current.getContext('2d').fillStyle = pixel.color;
    refCanvas.current.getContext('2d').strokeStyle = pixelBorderColor;
    refCanvas.current.getContext('2d').strokeRect(pixel.line * pixelSize, pixel.column * pixelSize, pixelSize, pixelSize);
    refCanvas.current.getContext('2d').fillRect((pixel.line * pixelSize) + 1, (pixel.column * pixelSize) + 1, pixelSize - 2, pixelSize - 2);
    pixel.occurrence += 1; // eslint-disable-line no-param-reassign
  }, []);

  const getMousePos = (evt) => {
    const rect = refCanvas.current.getBoundingClientRect();
    const scaleX = refCanvas.current.width / rect.width;
    const scaleY = refCanvas.current.height / rect.height;
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY,
    };
  };

  const handleClick = useCallback((evt) => {
    const getPixel = (x, y) => pixels.find((pixel) => pixel.line === x && pixel.column === y);

    const mousePos = getMousePos(evt);
    const x = Math.floor(mousePos.x / pixelSize);
    const y = Math.floor(mousePos.y / pixelSize);
    const clickedPixel = getPixel(x, y);
    clickedPixel.color = color;
    drawPixel(clickedPixel);
  }, [color, drawPixel, pixels]);

  useEffect(() => {
    const canvas = refCanvas.current;
    canvas.addEventListener('click', handleClick, false);
    return () => canvas.removeEventListener('click', handleClick);
  }, [handleClick]);

  useEffect(() => {
    setPixels(generateEmptyPixels());
  }, []);

  useEffect(() => {
    pixels.forEach((pixel) => {
      drawPixel(pixel);
    });
  });

  const callbackColor = (colorPickerData) => {
    setColor(colorPickerData.target.value);
  };

  return (
    <div className="board">
      <ColorPicker parentCallback={callbackColor} />
      <canvas
        id="myCanvas"
        ref={refCanvas}
        width={colsNb * pixelSize}
        height={linesNb * pixelSize}
      />
    </div>
  );
}

Board.propTypes = {
  linesNb: PropTypes.number.isRequired,
  colsNb: PropTypes.number.isRequired,
};
