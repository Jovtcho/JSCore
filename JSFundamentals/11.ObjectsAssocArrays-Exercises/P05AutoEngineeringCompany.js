function createCarCatalogue(paramsArr) {
    let catalogue = new Map();

    for (let line of paramsArr) {
        let [carBrand, carModel, producedCars] = line.split(/\s*\|\s*/)
            .filter(el => el !== "")
            .map(el => el.trim());
        producedCars = Number(producedCars);

        if (!catalogue.has(carBrand)) {
            catalogue.set(carBrand, new Map());
        }

        if (!catalogue.get(carBrand).has(carModel)) {
            catalogue.get(carBrand).set(carModel, 0);
        }

        let currentProducedCars = catalogue.get(carBrand).get(carModel) + producedCars;
        catalogue.get(carBrand).set(carModel, currentProducedCars);
    }

    for (let [brand, models] of catalogue) {
        console.log(brand);

        for (let [model, producedCars] of models) {
            console.log(`###${model} -> ${producedCars}`);
        }
    }
}

createCarCatalogue([
    "Audi | Q7 | 1000",
    "Audi | Q6 | 100",
    "BMW | X5 | 1000",
    "BMW | X6 | 100",
    "Citroen | C4 | 123",
    "Volga | GAZ-24 | 1000000",
    "Lada | Niva | 1000000",
    "Lada | Jigula | 1000000",
    "Citroen | C4 | 22",
    "Citroen | C5 | 10"
]);