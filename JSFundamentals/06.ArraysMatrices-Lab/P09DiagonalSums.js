function sumDiagonals(matrix) {
    let mainDiagSum = 0;
    let secondDiagSum = 0;

    for (let index = 0; index < matrix.length; index++) {
        mainDiagSum += matrix[index][index];
        secondDiagSum += matrix[index][matrix.length - 1 - index];
    }

    return mainDiagSum + " " + secondDiagSum;
}

console.log(sumDiagonals([[20, 40], [10, 60]]));
console.log(sumDiagonals([[3, 5, 17], [-1, 7, 14], [1, -8, 89]]));