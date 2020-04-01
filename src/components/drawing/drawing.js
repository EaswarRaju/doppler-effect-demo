/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import imgSrc from '../../assets/star-small.png';
import { changeColor } from './drawing-utils';

const Drawing = ({ drawingColor, colorValue }) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const imageRef = useRef(null);

    const updateColor = () => {
        const canvas = canvasRef.current
        contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
        contextRef.current.drawImage(imageRef.current, 0, 0);
        const imageData = contextRef.current.getImageData(0, 0, canvas.width, canvas.height);
        changeColor(imageData.data, drawingColor, colorValue)
        contextRef.current.putImageData(imageData, 0, 0);
    };

    useEffect(() => {
        const canvas = canvasRef.current
        contextRef.current = canvas.getContext('2d');
        const image = new Image();
        image.src = imgSrc;
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            imageRef.current = image;
            updateColor();
        };
    }, []);

    useEffect(() => {
        if (imageRef.current) {
            updateColor();
        }
    }, [colorValue, drawingColor]);

    return (
        <canvas ref={canvasRef}></canvas>
    );
};

Drawing.propTypes = {
    drawingColor: PropTypes.number,
    colorValue: PropTypes.number
};

export default Drawing;