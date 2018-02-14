function produceJuiceBottles(paramsArr) {
    let juices = new Map();
    let bottles = new Map();

    for (let line of paramsArr) {
        let [juice, quantity] = line.split(/\s*=>\s*/)
            .filter(el => el !== "")
            .map(el => el.trim());

        if (!juices.has(juice)) {
            juices.set(juice, 0);
        }

        let totalJuice = juices.get(juice) + Number(quantity);

        if (totalJuice / 1000 >= 1) {
            //let leftJuice = totalJuice % 1000;
            if (!bottles.has(juice)) {
                bottles.set(juice, 0);
            }

            let newBottlesCount = bottles.get(juice) + Math.floor(totalJuice / 1000);
            bottles.set(juice, newBottlesCount);
        }

        juices.set(juice, totalJuice % 1000);
    }

    for (let [juice, bottleCount] of bottles) {
        console.log(`${juice} => ${bottleCount}`);
    }
}

produceJuiceBottles([
    "Kiwi => 234",
    "Pear => 2345",
    "Watermelon => 3456",
    "Kiwi => 4567",
    "Pear => 5678",
    "Watermelon => 6789"
]);
