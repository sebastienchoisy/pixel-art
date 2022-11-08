import React, {useEffect, useRef} from 'react';
import './board.css';
import {Pixel} from './pixel';

const Board = props => {
    const refCanvas = useRef(null);
    const pixelSize = 12;
    const pixelBorderColor = "#D3D3D3";
    useEffect(() => {
        const generateEmptyPixels = () => {
            let pixels = [];
            for (let i = 0; i < props.linesNb; i++) {
                for (let j = 0; j < props.colsNb; j++) {
                    let newPixel = new Pixel(i, j);
                    pixels.push(newPixel);
                }
            }
            return pixels;
        }
        const pixels = generateEmptyPixels();

        const canvas = refCanvas.current;
        const context = canvas.getContext('2d');

        const drawPixel = pixel => {
            context.strokeStyle = pixelBorderColor;
            context.fillStyle = pixel.color;
            context.strokeRect(pixel.line * pixelSize, pixel.column * pixelSize, pixelSize, pixelSize);
            context.fillRect(pixel.line * pixelSize, pixel.column * pixelSize, pixelSize, pixelSize);
            pixel.occurrence++;
        }
        //Our first draw
        pixels.forEach((pixel) => {
            drawPixel(pixel, context)
        })

        const getMousePos = (evt) => {
            let rect = canvas.getBoundingClientRect(),
                scaleX = canvas.width / rect.width,
                scaleY = canvas.height / rect.height;
            return {
                x: (evt.clientX - rect.left) * scaleX,
                y: (evt.clientY - rect.top) * scaleY
            };
        }

        const getPixel = (x, y) => {
            return pixels.find((pixel) => pixel.line === x && pixel.column === y);
        }

        const handleClick = (evt) => {
            let mousePos = getMousePos(evt);
            let x = Math.floor(mousePos.x / pixelSize)
            let y = Math.floor(mousePos.y / pixelSize)
            let clickedPixel = getPixel(x, y);
            // TODO prendre la couleur du color picker
            clickedPixel.color = "#cc0000"
            drawPixel(clickedPixel)
        }

        canvas.addEventListener("click", handleClick, false);
    }, [])

    return <div className="board">
        <canvas id="myCanvas" ref={refCanvas} width={props.colsNb * pixelSize}
                height={props.linesNb * pixelSize}></canvas>
    </div>

}


export default Board;
