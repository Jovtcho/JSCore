function buildOrbit(paramsArr) {
    let [rows, cols, x, y] = paramsArr;
    let matrix = [];

    fillMatrixWithZero(rows, cols);
    let num = 1;
    matrix[x][y] = num;
    let counter = 1;
    let currentRow = x;
    let currentCol = y;

    while (true) {
        let isFilled = true;
        num++;

        let startRow = Math.max(0, currentRow - counter);
        let endRow = Math.min(matrix.length - 1, currentRow + counter);
        let startCol = Math.max(0, currentCol - counter);
        let endCol = Math.min(matrix[currentRow].length - 1, currentCol + counter);

        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                if (matrix[row][col] === 0) {
                    matrix[row][col] = num;
                    isFilled = false;
                }
            }
        }

        counter++;

        if (isFilled) {
            break;
        }
    }

    function fillMatrixWithZero(rows, cols) {
        for (let row = 0; row < rows; row++) {
            let row = "0".repeat(cols).split("").map(Number);
            matrix.push(row);
        }
    }

    return matrix.map(row => row.join(" ")).join("\n");
}

console.log(buildOrbit([4, 4, 0, 0]));