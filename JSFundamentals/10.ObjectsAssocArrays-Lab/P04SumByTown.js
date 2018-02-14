function sumByTown(paramsArr) {
    let towns = {};
    for (let index = 0; index < paramsArr.length; index += 2) {
        let town = paramsArr[index];
        let sum = Number(paramsArr[index + 1]);

        if (!towns.hasOwnProperty(town)) {
            towns[town] = 0;
        }

        towns[town] += sum;
    }

    return JSON.stringify(towns);
}

console.log(sumByTown([
    "Sofia",
    "20",
    "Varna",
    "3",
    "Sofia",
    "5",
    "Varna",
    "4"
]));