import React, {useCallback, useEffect, useRef, useState} from 'react';
import './Board.css';
import { Pixel  } from './Pixel';
import { ColorPicker } from './ColorPicker'

const Board = props => {
    const refCanvas = useRef(null);
    const pixelSize = 12;
    const pixelBorderColor = "#D3D3D3";
    const [pixels, setPixels] = useState([]);
    const [color, setColor] = useState("#cc0000");

    const generateEmptyPixels = () => {
        let pixelTab = [];
        console.log('hehe')
        for (let i = 0; i < props.linesNb; i++) {
            for (let j = 0; j < props.colsNb; j++) {
                let newPixel = new Pixel(i, j);
                pixelTab.push(newPixel);
            }
        }
        console.log('salut c"est fini')
        setPixels(pixelTab)
    }

    const drawPixel = pixel => {
        refCanvas.current.getContext('2d').fillStyle = pixel.color;
        refCanvas.current.getContext('2d').strokeStyle = pixelBorderColor;
        refCanvas.current.getContext('2d').strokeRect(pixel.line * pixelSize, pixel.column * pixelSize, pixelSize, pixelSize);
        refCanvas.current.getContext('2d').fillRect((pixel.line * pixelSize)+1, (pixel.column * pixelSize)+1, pixelSize-2, pixelSize-2);
        pixel.occurrence++;
    }

    const getPixel = (x, y) => {
        console.log('titi')
        return pixels.find((pixel) => pixel.line === x && pixel.column === y);
    };
    
     const handleClick = useCallback((evt) => { 
         let mousePos = getMousePos(evt);
         let x = Math.floor(mousePos.x / pixelSize)
         let y = Math.floor(mousePos.y / pixelSize)
         let clickedPixel = getPixel(x, y);
         // TODO prendre la couleur du color picker
         console.log('couleur : ')
         console.log(color)
         clickedPixel.color = color;
         console.log('pixel : ')
         console.log(clickedPixel)
         drawPixel(clickedPixel);
     }, [color, drawPixel, getPixel]);


    useEffect(() => {
        console.log('tata')
        const canvas = refCanvas.current;
        canvas.addEventListener("click", handleClick, false);
        generateEmptyPixels();

        return () => canvas.removeEventListener("click", handleClick);
    }, [generateEmptyPixels, handleClick])

    useEffect(() => {
        console.log('toto')
        //Our first draw
        pixels.forEach((pixel) => {
            console.log(refCanvas)
            drawPixel(pixel, refCanvas.current?.getContext('2d'))
        });
    }, [drawPixel, pixels])

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
        console.log('Color from child : ' + colorPickerData.target.value)
        setColor(colorPickerData.target.value);
    }

    console.log('_'+color);

    return <div className="board">
        <ColorPicker parentCallback={callbackColor}/>
        <canvas id="myCanvas" ref={refCanvas} width={props.colsNb * pixelSize}
                height={props.linesNb * pixelSize}></canvas>
    </div>

}


export default Board;
