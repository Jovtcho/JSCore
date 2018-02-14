function attackDiagonals(arr) {
    let matrix = [];
    for (let index = 0; index < arr.length; index++) {
        let currentRow = arr[index].split(" ").map(Number);
        matrix.push(currentRow);
    }

    let mainDiagSum = 0;
    let secondDiagSum = 0;

    for (let index = 0; index < matrix.length; index++) {
        mainDiagSum += matrix[index][index];
        secondDiagSum += matrix[index][matrix.length - 1 - index];

    }

    if (mainDiagSum === secondDiagSum) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (row !== col && row !== matrix[row].length - 1 - col) {
                    matrix[row][col] = mainDiagSum;
                }
            }
        }
    }

    return matrix.map(row => row.join(" ")).join("\n");
}


console.log(attackDiagonals(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']
));