function findGreatestNumInMatrix(matrix) {
    let theGreatest = matrix[0][0];
    // for (let row = 0; row < matrix.length; row++) {
    //     for (let col = 0; col < matrix[row].length; col++) {
    //         if (matrix[row][col] > theGreatest) {
    //             theGreatest = matrix[row][col];
    //         }
    //     }
    // }

    matrix.forEach(row => row.forEach(el => theGreatest = Math.max(theGreatest, el)));

    return theGreatest;
}



console.log(findGreatestNumInMatrix([[20, 50, 10], [8, 33, 145]]));
console.log(findGreatestNumInMatrix([[3, 5, 7, 12], [-1, 4, 33, 2], [8, 3, 0, 4]]));