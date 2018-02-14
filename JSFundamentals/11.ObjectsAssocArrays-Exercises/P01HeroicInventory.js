function createHeroesInventory(paramsArr) {
    let heroes = [];

    for (let line of paramsArr) {
        let [name, level, items] = line.split(/\s*\/\s*/)
            .filter(el => el !== "")
            .map(el => el.trim());

        if (items !== undefined) {
            items = items.split(/\s*,\s*/)
                .filter(el => el !== "")
                .map(el => el.trim());
        } else {
            items = [];
        }

        let hero = {
            name: name,
            level: Number(level),
            items: items
        };

        heroes.push(hero);
    }

    return JSON.stringify(heroes);
}


console.log(createHeroesInventory([
    "Hes / 1",
    "Isacc / 25 / Apple, GravityGun",
    "Derek / 12 / BarrelVest, DestructionSword",
    "Hes / 1 / Desolator, Sentinel, Antara"
]));