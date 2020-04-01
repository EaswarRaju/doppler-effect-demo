/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './slider.scss';

const Slider = ({ min, max, value = 0, onChange }) => {
    const [slideValue, setSlideValue] = useState(value);
    const slideControlRef = useRef(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        const slideControl = slideControlRef.current;
        let initialX;
        let currentLeft = 0;
        let isSliding = false;
        const minSliderLeft = 0;
        const maxSliderLeft = sliderRef.current.offsetWidth;

        const dragStart = (event) => {
            initialX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
            isSliding = true;
            currentLeft = slideControl.offsetLeft
        };

        const getSlideValue = (currentPosition) => {
            let minValue = min;
            let maxValue = max;
            let offset = 0;
            while (minValue <= 0) {
                minValue += 100;
                maxValue += 100;
                offset += 100;
            }
            minValue = Math.log(minValue);
            maxValue = Math.log(maxValue);
            const scale = (maxValue - minValue) / maxSliderLeft;

            const newValue = Math.exp(minValue + scale * currentPosition);
            return (newValue - offset).toFixed(2);
        };

        const moveSlide = diff => {
            let updatedLeft = currentLeft + diff;

            if (updatedLeft < minSliderLeft) {
                updatedLeft = 0;
            } else if (updatedLeft > maxSliderLeft) {
                updatedLeft = maxSliderLeft
            }

            slideControl.style.left = updatedLeft + 'px';
            setSlideValue(getSlideValue(updatedLeft));
        };

        const dragMove = (event) => {
            if (isSliding) {
                const diffX = (event.changedTouches ? event.changedTouches[0].clientX : event.clientX) - initialX;
                moveSlide(diffX);
            }
        };

        const stopSelection = (event) => {
            event.preventDefault();
            return false;
        };

        const dragEnd = () => {
            isSliding = false;
        };

        const handleArrowKeys = (event) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
                currentLeft = slideControl.offsetLeft;
                moveSlide(-2);
            } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
                currentLeft = slideControl.offsetLeft;
                moveSlide(2);
            }
        };

        const handleSlideSelection = (event) => {
            const mousePosition = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
            const newPosition = mousePosition - sliderRef.current.getBoundingClientRect().x;

            slideControl.style.left = newPosition + 'px';
            setSlideValue(getSlideValue(newPosition));
        };

        slideControl.addEventListener('mousedown', dragStart, false);
        document.addEventListener('mouseup', dragEnd, false);
        document.addEventListener('mousemove', dragMove, false);

        document.addEventListener('selectstart', stopSelection, false);

        slideControl.addEventListener('touchstart', dragStart, false);
        document.addEventListener('touchend', dragEnd, false);
        document.addEventListener('touchmove', dragMove, false);

        slideControl.addEventListener('keydown', handleArrowKeys, false);

        sliderRef.current.addEventListener('mousedown', handleSlideSelection, false);
        sliderRef.current.addEventListener('touchstart', handleSlideSelection, false);

    }, []);

    useEffect(() => {
        onChange(slideValue)
    }, [slideValue]);

    useEffect(() => {
        const getSlidePosition = (newValue) => {
            let minValue = min;
            let maxValue = max;
            let offset = 0;
            while (minValue <= 0) {
                minValue += 100;
                maxValue += 100;
                offset += 100;
            }
            minValue = Math.log(minValue);
            maxValue = Math.log(maxValue);
            const scale = (maxValue - minValue) / sliderRef.current.offsetWidth;

            return (Math.log(parseFloat(newValue) + offset) - minValue) / scale;
        };

        const newPosition = getSlidePosition(value);
        slideControlRef.current.style.left = newPosition + 'px';
    }, [value]);

    return (
        <div className="slider" ref={sliderRef}>
            <button className="slider-control" ref={slideControlRef} />
        </div>
    );
};

Slider.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func
};

Slider.defaultProps = {
    onChange: () => {}
};

export default Slider;