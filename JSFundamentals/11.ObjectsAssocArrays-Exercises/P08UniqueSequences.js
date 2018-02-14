function findUniqueSequences(paramsArr) {
    let collection = new Set();
    for (let line of paramsArr) {
        let currentArr = JSON.parse(line)
            .map(el => Number(el))
            .sort((a, b) => b - a);
        collection.add(JSON.stringify(currentArr));
    }

    let outputArrays = [];
    for (let arr of collection) {
        outputArrays.push(JSON.parse(arr));
    }

    outputArrays.sort((a, b) => a.length - b.length)
        .forEach(el => console.log(`[${el.join(", ")}]`));
}


findUniqueSequences([
    "[-3, -2, -1, 0, 1, 2, 3, 4]",
    "[10, 1, -17, 0, 2, 13]",
    "[4, -3, 3, -2, 2, -1, 1, 0]"
]);
console.log();
findUniqueSequences([
    "[7.14, 7.180, 7.339, 80.099]",
    "[7.339, 80.0990, 7.140000, 7.18]",
    "[7.339, 7.180, 7.14, 80.099]"
]);