function isInsideVolume(arr) {
    const x1 = 10;
    const x2 = 50;
    const y1 = 20;
    const y2 = 80;
    const z1 = 15;
    const z2 = 50;

    function isInRange(coord1, coord2, coord) {
        return coord1 <= coord && coord <= coord2;
    }

    for (let index = 0; index < arr.length; index += 3) {
        let x = arr[index];
        let y = arr[index + 1];
        let z = arr[index + 2];

        let isInside = isInRange(x1, x2, x) && isInRange(y1, y2, y) && isInRange(z1, z2, z);

        console.log(isInside ? "inside" : "outside");
    }
}

isInsideVolume([8, 20, 22]);
isInsideVolume([13.1, 50, 31.5, 50, 80, 50, -5, 18, 43]);
