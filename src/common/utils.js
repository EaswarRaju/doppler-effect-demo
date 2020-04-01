export const translateVelocityToColor = velocity => Math.round(Math.abs(255 * (velocity / 100)));

export const isValidInput = (value, min, max) => {
    if (isNaN(value) && value !== '-') {
        return false;
    }
    const parsedVal = parseInt(value, 10);
    return value === '' || (parsedVal >= min && parsedVal <= max) || (value === '-' && min < 0);
};

export const formatInput = value => {
    if (value && value.includes('.') && ((value.length - value.indexOf('.')) > 3)) {
        return value.substr(0, value.indexOf('.') + 3)
    }
    return value;
}