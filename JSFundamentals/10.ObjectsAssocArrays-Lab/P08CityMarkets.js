function calcMarketsSummary(paramsArr) {
    let splitTownsProducts = /\s*->\s*/g;
    let splitSales = /\s*:\s*/g;
    let statsByTown = new Map();

    for (let line of paramsArr) {
        //Sofia -> Laptops HP -> 200 : 2000
        let [town, product, sales] = line.split(splitTownsProducts);
        let [quantity, pricePerUnit] = sales.split(splitSales);
        let currentSale = Number(quantity) * Number(pricePerUnit);

        if (!statsByTown.has(town)) {
            statsByTown.set(town, new Map());
        }

        if (!statsByTown.get(town).has(product)) {
            statsByTown.get(town).set(product, 0);
        }

        let oldSale = statsByTown.get(town).get(product);
        statsByTown.get(town).set(product, currentSale + oldSale);
    }

    for (let [town, products] of statsByTown) {
        console.log(`Town - ${town}`);

        for (let [product, sale] of products) {
            console.log(`$$$${product} : ${sale}`);
        }
    }
}

calcMarketsSummary(
    ["Sofia -> Laptops HP -> 200 : 2000",
        "Sofia -> Raspberry -> 200000 : 1500",
        "Sofia -> Audi Q7 -> 200 : 100000",
        "Montana -> Portokals -> 200000 : 1",
        "Montana -> Qgodas -> 20000 : 0.2",
        "Montana -> Chereshas -> 1000 : 0.3",
        "Montana -> Chereshas -> 1000 : 3"]
);