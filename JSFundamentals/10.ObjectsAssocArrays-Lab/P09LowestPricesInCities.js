function getLowestPrice(paramsArr) {
    let products = new Map();
    let delimiter = /\s*\|\s*/;

    for (let line of paramsArr) {
        let [town, product, price] = line.split(delimiter)
            .filter(el => el !== "")
            .map(el => el.trim());

        if (!products.has(product)) {
            products.set(product, new Map());
        }

        if (!products.get(product).has(town)) {
            products.get(product).set(town, 0);
        }

        products.get(product).set(town, Number(price));
    }

    for (let [product, towns] of products) {
        let townAndLowestPrice = [...towns].sort((t1, t2) => t1[1] - t2[1])[0];
        let lowestPrice = townAndLowestPrice[1];
        let townWithLowestPrice = townAndLowestPrice[0];
        console.log(`${product} -> ${lowestPrice} (${townWithLowestPrice})`);
    }
}

getLowestPrice([
    "New York | Sample Product | 1000.1",
    "Sample Town | Sample Product | 1000",
    "Sofia | Orange | 3",
    "Sofia | Peach | 2",
    "Sample Town | Orange | 2",
    "New York | Burger | 10",
    "Sample Town | Peach | 1",
    "New York | Burger | 99"
]);