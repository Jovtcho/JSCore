function calcDistanceBetweenObjects(arr) {
    let firstObjectVelocity = arr[0] * 1000 / 3600;
    let secondObjectVelocity = arr[1] * 1000 / 3600;
    let travelTime = arr[2];

    let firstDistance = firstObjectVelocity * travelTime;
    let secondDistance = secondObjectVelocity * travelTime;

    let distanceBetweenObjects = Math.abs(firstDistance - secondDistance);

    return distanceBetweenObjects;
}

console.log(calcDistanceBetweenObjects([0, 60, 3600]));
console.log(calcDistanceBetweenObjects([11, 10, 120]));
console.log(calcDistanceBetweenObjects([5, -5, 40]));


