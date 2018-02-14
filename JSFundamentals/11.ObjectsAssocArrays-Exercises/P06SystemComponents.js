function createSystemCatalogue(paramsArr) {
    let catalogue = new Map();

    for (let line of paramsArr) {
        let [system, component, subComponent] = line.split(/\s*\|\s*/)
            .filter(el => el !== "")
            .map(el => el.trim());

        if (!catalogue.has(system)) {
            catalogue.set(system, new Map());
        }

        if (!catalogue.get(system).has(component)) {
            catalogue.get(system).set(component, new Set());
        }

        catalogue.get(system).get(component).add(subComponent);
    }

    let sortedCatalogue = [...catalogue].sort((a, b) => {
        if (b[1].size === a[1].size) {
            return a[0].localeCompare(b[0]);
        }

        return b[1].size - a[1].size;
    });

    for (let [system, components] of sortedCatalogue) {
        console.log(system);
        let sortedComponents = [...components].sort((a, b) => b[1].size - a[1].size);

        for (let [component, subComponents] of sortedComponents) {
            console.log(`|||${component}`);

            for (let subComponent of subComponents) {
                console.log(`||||||${subComponent}`);
            }
        }
    }
}

createSystemCatalogue([
    "SULS | Main Site | Home Page",
    "SULS | Main Site | Login Page",
    "SULS | Main Site | Register Page",
    "SULS | Judge Site | Login Page",
    "SULS | Judge Site | Submittion Page",
    "Lambda | CoreA | A23",
    "SULS | Digital Site | Login Page",
    "Lambda | CoreB | B24",
    "Lambda | CoreA | A24",
    "Lambda | CoreA | A25",
    "Lambda | CoreC | C4",
    "Indice | Session | Default Storage",
    "Indice | Session | Default Security"
]);