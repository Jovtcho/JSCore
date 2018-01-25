function isDistanceValid(paramsArr) {
    let distance = (x, y) => {
        let result = Math.sqrt(x * x + y * y);
        let checkResult = Math.round(result);
        return result === checkResult ? "is valid" : "is invalid";
    };

    function printOutput(x1, y1, x2, y2, result) {
        return `{${x1}, ${y1}} to {${x2}, ${y2}} ${result}`;
    }

    let distanceP1toZero = distance(paramsArr[0], paramsArr[1]);
    let distanceP2ToZero = distance(paramsArr[2], paramsArr[3]);
    let distanceP1toP2 = distance(paramsArr[0] - paramsArr[2], paramsArr[1] - paramsArr[3]);


    console.log(printOutput(paramsArr[0], paramsArr[1], 0, 0, distanceP1toZero));
    console.log(printOutput(paramsArr[2], paramsArr[3], 0, 0, distanceP2ToZero));
    console.log(printOutput(paramsArr[0], paramsArr[1], paramsArr[2], paramsArr[3], distanceP1toP2));
}


isDistanceValid([3, 0, 0, 4]);
isDistanceValid([2, 1, 1, 1]);