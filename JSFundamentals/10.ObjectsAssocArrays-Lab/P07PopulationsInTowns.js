function countPopulation(paramsArr) {
    let delimiter = /\s*<->\s*/g;
    let townStats = new Map();

    for (let line of paramsArr) {
        let tokens = line.split(delimiter);
        let town = tokens[0];
        let population = Number(tokens[1]);

        //if (!townStats.get(town)) {
        if (!townStats.has(town)) {
            townStats.set(town, 0);
        }

        townStats.set(town, townStats.get(town) + population);
    }

    for (let [key, value] of townStats) {
        console.log(`${key} : ${value}`);
    }
}


countPopulation([
    "Sofia <-> 1200000",
    "Montana <-> 20000",
    "New York <-> 10000000",
    "Washington <-> 2345000",
    "Las Vegas <-> 1000000",
    "Sofia <-> 1200000",
    "Montana <-> 20000",
    "New York <-> 10000000",
    "Washington <-> 2345000",
    "Las Vegas <-> 1000000"
]);