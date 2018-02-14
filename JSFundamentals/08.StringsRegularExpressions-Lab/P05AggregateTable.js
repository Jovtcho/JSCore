function aggregateTable(paramsArr) {
    let towns = [];
    let sum = 0;

    for (let element of paramsArr) {
        let data = element.split("|").filter(el => el !== "").map(el => el.trim());
        towns.push(data[0]);
        sum += Number(data[1]);
    }

    console.log(towns.join(", "));
    console.log(sum);
}

aggregateTable(['| Sofia           | 300', '| Veliko Tarnovo  | 500', '| Yambol          | 275']);
//console.log(aggregateTable(['| Sofia           | 300', '| Veliko Tarnovo  | 500', '| Yambol          | 275']));