function generateSpiralMatrix(rows, cols) {
    let matrix = [];
    fillMatrixWithZero(rows, cols);

    let endNumber = rows * cols;
    let currentNum = 1;
    let counter = 0;
    let currentRow = 0;
    let currentCol = 0;

    while (currentNum <= endNumber) {

        //top row - left to right
        for (let col = counter; col < cols - counter; col++) {
            matrix[currentRow][currentCol++] = currentNum++;
        }

        //right col - top to bottom
        currentCol--;
        currentRow++;
        for (let row = currentRow; row < rows - counter; row++) {
            matrix[currentRow++][currentCol] = currentNum++;
        }

        // bottom row - right to left
        currentCol--;
        currentRow--;
        for (let col = cols - 1 - counter; col > counter; col--) {
            matrix[currentRow][currentCol--] = currentNum++;
        }

        //left col - bottom to top
        currentRow--;
        currentCol++;
        for (let row = currentRow; row > counter; row--) {
            matrix[currentRow--][currentCol] = currentNum++;
        }

        counter++;
        currentRow++;
        currentCol++;
    }

    function fillMatrixWithZero(rows, cols) {
        for (let row = 0; row < rows; row++) {
            matrix.push("0".repeat(cols).split("").map(Number));
        }
    }

    function printMatrix(matrix) {
        return matrix.map(row => row.join(" ")).join("\n");
    }

    return printMatrix(matrix);
}


console.log(generateSpiralMatrix(5, 5));
console.log(generateSpiralMatrix(2, 2));