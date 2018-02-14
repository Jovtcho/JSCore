function parseTownToJson(paramsArr) {
    let [col1, col2, col3] = paramsArr.shift()
        .split("|").filter(el => el !== "")
        .map(el => el.trim());
    let towns = [];

    for (let line of paramsArr) {
        let [town, lat, long] = line
            .split("|").filter(el => el !== "")
            .map(el => el.trim());
        let currentTown = {};
        currentTown[col1] = town;
        currentTown[col2] = Number(lat);
        currentTown[col3] = Number(long);
        towns.push(currentTown);
    }

    return JSON.stringify(towns);
}


console.log(parseTownToJson(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']));