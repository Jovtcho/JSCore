function convertGradsToDegrees(numberInGrad) {
    let numberInDeg = numberInGrad * 360 / 400;

    let degrees = numberInDeg % 360;

    if (degrees < 0) {
        degrees = 360 + degrees;
    }

    return degrees;
}

console.log(convertGradsToDegrees(100));
console.log(convertGradsToDegrees(400));
console.log(convertGradsToDegrees(850));
console.log(convertGradsToDegrees(-50));