function printArgsInfo() {
    let statistic = new Map();
    for (let obj of arguments) {
        let type = typeof obj;
        console.log(`${type}: ${obj}`);
        if (!statistic.has(type)) {
            statistic.set(type, 0);
        }

        statistic.set(type, statistic.get(type) + 1);
    }

    let ordered = ([...statistic]).sort((el1, el2) => {
        return el2[1] - el1[1];
    });

    for (let [key, value] of ordered) {
        console.log(`${key} = ${value}`);
    }
}

//printArgsInfo('cat', 42, function () {console.log('Hello world!');}, 'dog', 30, 'cow', 23);
printArgsInfo({name: 'bob'}, 3.333, 9.999);