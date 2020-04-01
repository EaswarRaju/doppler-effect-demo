
export const changeColor = (imageData, color, colorValue) => {
    if (colorValue) {
        for (let i = 0; i < imageData.length; i += 4) {
            imageData[i + color] = Math.min(imageData[i + color], 255 - colorValue);
            imageData[i + 1] = Math.min(imageData[i + 1], 255 - colorValue);
        }
    }
}