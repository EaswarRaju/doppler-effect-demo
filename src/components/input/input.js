/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isValidInput, formatInput } from '../../common/utils';
import './input.scss';

const Input = ({ type, value, min = 0, max = 10, label, onChange }) => {
    const [inputValue, setValue] = useState(value);

    const onChangeHandler = (input) => {
        const newValue = input.target.value;
        if (type === 'text') {
            setValue(newValue);
            onChange(newValue);
        } else {
            if (isValidInput(newValue, min, max)) {
                const formattedValue = formatInput(newValue);
                setValue(formattedValue);
                onChange(formattedValue);
            }
        }
    };

    useEffect(() => {
        if (value !== inputValue) {
            setValue(value);
        }
    }, [value])

    const changeValue = direction => {
        let newValue = parseFloat(inputValue);

        if (isNaN(newValue) || newValue === '' || newValue === '-') {
            newValue = 0;
        }

        if (direction === 'up') {
            newValue += 1;
        } else if (direction === 'down') {
            newValue -= 1;
        }

        if (newValue < min) {
            newValue = min;
        } else if (newValue > max) {
            newValue = max;
        }

        newValue = inputValue.toString().includes('.') ? newValue.toFixed(2) : newValue

        setValue(newValue);
        onChange(newValue);
    };

    const arrowKeysHandler = (event) => {
        if (event.key === 'ArrowUp') {
            changeValue('up');
        } else if (event.key === 'ArrowDown') {
            changeValue('down');
        }
    };

    const props = {
        type: 'text',
        value: inputValue,
        onChange: onChangeHandler
    };

    return (
        <label className="input-control">
            {label && <span className="input-label">{label}</span>}
            <input {...props} onKeyDown={arrowKeysHandler} />
        </label>
    );
};

Input.propTypes = {
    type: PropTypes.oneOf(['number', 'text']),
    min: PropTypes.number,
    max: PropTypes.number,
    label: PropTypes.string,
    onChange: PropTypes.func
};

Input.defaultProps = {
    type: 'text',
    value: '',
    onChange: () => {}
};

export default Input;