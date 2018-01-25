function findTripLength(paramsArr) {
    let points = {};
    let counter = 1;
    for (let index = 0; index < paramsArr.length; index += 2) {
        points[counter] = [paramsArr[index], paramsArr[index + 1]];
        counter++;
    }

    function calcDistance(pointA, pointB) {
        return Math.sqrt(Math.pow(pointA[0] - pointB[0], 2) + Math.pow(pointA[1] - pointB[1], 2));
    }

    let shortestPath = Number.MAX_VALUE;
    let allDistances = {};
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            if (j === i) {
                continue;
            }

            for (let k = 1; k <= 3; k++) {
                if (k === j || i === k) {
                    continue;
                }

                let distance = calcDistance(points[i], points[j]) + calcDistance(points[j], points[k]);
                allDistances["" + i + j + k] = distance;
                if (distance <= shortestPath) {
                    shortestPath = distance;
                }
            }
        }
    }

    let filtered = {};
    for (let distance in allDistances) {
        if (allDistances[distance] <= shortestPath) {
            filtered[distance] = allDistances[distance];
        }
    }

    let keys = [];
    for (let key in filtered) {
        keys.push(key);
    }

    keys.sort();
    let pointOrder = keys[0].split("").join("->");
    return `${pointOrder}: ${filtered[keys[0]]}`;
}

console.log(findTripLength([0, 0, 2, 0, 4, 0]));
console.log(findTripLength([5, 1, 1, 1, 5, 4]));
console.log(findTripLength([-1, -2, 3.5, 0, 0, 2]));
console.log(findTripLength([-1, 0, 1, 1, 0, 1]));
console.log(findTripLength([0, 3, 1, 0, -1, 0]));