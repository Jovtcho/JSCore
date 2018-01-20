function calcDistanceBetweenTwoPints(coordsArr) {
    let pointA = {x: coordsArr[0], y: coordsArr[1], z: coordsArr[2]};
    let pointB = {x: coordsArr[3], y: coordsArr[4], z: coordsArr[5]};

    let distance = Math.sqrt((pointA.x - pointB.x) * (pointA.x - pointB.x)
        + (pointA.y - pointB.y) * (pointA.y - pointB.y)
        + (pointA.z - pointB.z) * (pointA.z - pointB.z));

    console.log(distance);
}

calcDistanceBetweenTwoPints([1, 1, 0, 5, 4, 0]);
calcDistanceBetweenTwoPints([3.5, 0, 1, 0, 2, -1]);
