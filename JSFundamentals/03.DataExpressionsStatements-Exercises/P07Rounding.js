function roundNumber(paramsArr) {
    let number = paramsArr[0];
    let precision = Math.min(paramsArr[1], 15);

    let output = (number / 1).toFixed(precision);

    return parseFloat(output);
}

console.log(roundNumber([3.1415926535897932384626433832795, 5]));
console.log(roundNumber([10.5, 6]));