function isMatrixMagic(matrix) {
    let rowsSum = matrix.map(row => row.reduce((acc, el) => acc + el, 0));
    let isAllRowSumsEquals = rowsSum.every(sum => sum === rowsSum[0]);
    let colsSum = [];

    for (let col = 0; col < matrix[0].length; col++) {
        let currentColSum = 0;
        for (let row = 0; row < matrix.length; row++) {
            currentColSum += matrix[row][col];
        }
        colsSum.push(currentColSum);
    }

    let isAllColSumsEquals = colsSum.every(sum => sum === colsSum[0]);

    return isAllRowSumsEquals && isAllColSumsEquals;
}

console.log(isMatrixMagic([[4, 5, 6], [6, 5, 4], [5, 5, 5]]));
console.log(isMatrixMagic([[11, 32, 45], [21, 0, 1], [21, 1, 1]]));
console.log(isMatrixMagic([[1, 0, 0], [0, 0, 1], [0, 1, 0]]));
