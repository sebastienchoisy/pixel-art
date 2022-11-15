import React, {useCallback, useEffect, useRef, useState} from 'react';
import './Board.css';
import { Pixel  } from './Pixel';
import { ColorPicker } from './ColorPicker'

const Board = props => {
    const refCanvas = useRef(null);
    const pixelSize = 12;
    const pixelBorderColor = "#D3D3D3";
    const [pixels, setPixels] = useState([]);
    const [color, setColor] = useState("#000000");

    const generateEmptyPixels = () => {
        let pixelTab = [];
        for (let i = 0; i < props.linesNb; i++) {
            for (let j = 0; j < props.colsNb; j++) {
                let newPixel = new Pixel(i, j);
                pixelTab.push(newPixel);
            }
        }
        return pixelTab;
        //setPixels(pixelTab)
    }

    const drawPixel = useCallback(pixel => {
        refCanvas.current.getContext('2d').fillStyle = pixel.color;
        refCanvas.current.getContext('2d').strokeStyle = pixelBorderColor;
        refCanvas.current.getContext('2d').strokeRect(pixel.line * pixelSize, pixel.column * pixelSize, pixelSize, pixelSize);
        refCanvas.current.getContext('2d').fillRect((pixel.line * pixelSize)+1, (pixel.column * pixelSize)+1, pixelSize-2, pixelSize-2);
        pixel.occurrence++;
    }, [])
    
     const handleClick = useCallback((evt) => { 
        const getPixel = (x, y) => {
            return pixels.find((pixel) => pixel.line === x && pixel.column === y);
        };

         let mousePos = getMousePos(evt);
         let x = Math.floor(mousePos.x / pixelSize)
         let y = Math.floor(mousePos.y / pixelSize)
         let clickedPixel = getPixel(x, y);
         clickedPixel.color = color;
         drawPixel(clickedPixel);
     }, [color, drawPixel, pixels]);


    useEffect(() => {
        const canvas = refCanvas.current;
        canvas.addEventListener("click", handleClick, false);
        return () => canvas.removeEventListener("click", handleClick);
    }, [handleClick])

    useEffect(() => {
        setPixels(generateEmptyPixels());
    },[]);

    useEffect(() => {
        //Our first draw
        pixels.forEach((pixel) => {
            drawPixel(pixel, refCanvas.current?.getContext('2d'))
        });
    })

    /*
react_devtools_backend.js:4026 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    */

    const getMousePos = (evt) => {
        let rect = refCanvas.current.getBoundingClientRect(),
            scaleX = refCanvas.current.width / rect.width,
            scaleY = refCanvas.current.height / rect.height;
        return {
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY
        };
    }

    const callbackColor = colorPickerData => {
        setColor(colorPickerData.target.value);
    }

    return <div className="board">
        <ColorPicker parentCallback={callbackColor}/>
        <canvas id="myCanvas" ref={refCanvas} width={props.colsNb * pixelSize}
                height={props.linesNb * pixelSize}></canvas>
    </div>

}

export default Board;
