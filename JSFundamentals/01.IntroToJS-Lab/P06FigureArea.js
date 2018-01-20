/**
 * Created by Jo on 1/9/2018.
 */

function calculateArea(firstFigureWidth, firstFigureHeight, secondFigureWidth, secondFigureHeight) {
    let firstFigureArea = firstFigureWidth * firstFigureHeight;
    let secondFigureArea = secondFigureWidth * secondFigureHeight;
    let diffFirstSecondFigure = Math.min(firstFigureWidth, secondFigureWidth) * Math.min(firstFigureHeight, secondFigureHeight);

    return firstFigureArea + secondFigureArea - diffFirstSecondFigure;
}

console.log(calculateArea(2, 4, 5, 3));
console.log(calculateArea(13, 2, 5, 8));