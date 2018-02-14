function createStoreCatalogue(paramsArr) {
    let catalogue = new Map();

    for (let line of paramsArr) {
        let [productName, productPrice] = line.split(/\s*:\s*/)
            .filter(el => el !== "")
            .map(el => el.trim());
        productPrice = Number(productPrice);
        let initial = productName[0];

        if (!catalogue.has(initial)) {
            catalogue.set(initial, new Map());
        }

        if (!catalogue.get(initial).has(productName)) {
            catalogue.get(initial).set(productName, productPrice);
        }
    }

    let sortedCatalogue = [...catalogue]
        .sort(sortFunc);

    for (let [initial, products] of sortedCatalogue) {
        console.log(initial);
        let sortedProducts = [...products]
            .sort(sortFunc);

        for (let [product, price] of sortedProducts) {
            console.log(`  ${product}: ${price}`);
        }
    }

    function sortFunc(el1, el2) {
        return (el1[0].localeCompare(el2[0]));
    }
}

createStoreCatalogue([
    "Appricot : 20.4",
    "Fridge : 1500",
    "TV : 1499",
    "Deodorant : 10",
    "Boiler : 300",
    "Apple : 1.25",
    "Anti-Bug Spray : 15",
    "T-Shirt : 10"
]);