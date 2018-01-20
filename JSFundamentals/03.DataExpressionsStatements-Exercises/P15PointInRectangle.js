function isPointInRectangle(paramsArr) {
    let [x, y, xMin, xMax, yMin, yMax] = paramsArr;

    if (xMin <= x && x <= xMax && yMin <= y && y <= yMax) {
        console.log("inside");
    } else {
        console.log("outside");
    }
}


isPointInRectangle([8, -1, 2, 12, -3, 3]);
isPointInRectangle([12.5, -1, 2, 12, -3, 3]);