/**
 * Created by Jo on 1/10/2018.
 */

function calcDistance(x1, y1, x2, y2) {
    let point1 = {x: x1, y: y1};
    let point2 = {x: x2, y: y2};

    let distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));

    return distance;
}

console.log(calcDistance(2, 4, 5, 0));
console.log(calcDistance(2.34, 15.66, -13.55, -2.9985));