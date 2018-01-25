function processCrystal(paramsArr) {
    let targetSize = paramsArr[0];

    let cut = num => num / 4;
    let lap = num => num - num * 20 / 100;
    let grind = num => num - 20;
    let etch = num => num - 2;
    let transportAndWash = num => {
        console.log("Transporting and washing");
        return Math.floor(num);
    };
    let xRay = num => {
        console.log("X-ray x1");
        return ++num;
    };

    for (let index = 1; index < paramsArr.length; index++) {
        let currentMicrons = paramsArr[index];
        console.log(`Processing chunk ${currentMicrons} microns`);

        currentMicrons = executeOp(targetSize, currentMicrons, "Cut", cut);
        currentMicrons = executeOp(targetSize, currentMicrons, "Lap", lap);
        currentMicrons = executeOp(targetSize, currentMicrons, "Grind", grind);
        currentMicrons = executeOp(targetSize, currentMicrons, "Etch", etch);

        if (currentMicrons + 1 === targetSize) {
            currentMicrons = xRay(currentMicrons);
        }

        console.log(`Finished crystal ${currentMicrons} microns`);
    }

    function executeOp(targetSize, currentSize, opName, operation) {
        let counter = 0;

        while (operation(currentSize) >= targetSize || currentSize - targetSize === 1) {
            currentSize = operation(currentSize);
            counter++;
        }

        if (counter > 0) {
            console.log(`${opName} x${counter}`);
            currentSize = transportAndWash(currentSize);
        }

        return currentSize;
    }
}


processCrystal([1375, 50000]);
//processCrystal([1000, 4000, 8100]);