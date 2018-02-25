let manager = (function () {
    let microElements = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    };

    let recipes = {
        apple: {carbohydrate: 1, flavour: 2},
        coke: {carbohydrate: 10, flavour: 20},
        burger: {carbohydrate: 5, fat: 7, flavour: 3},
        omelet: {protein: 5, fat: 1, flavour: 1},
        cheverme: {protein: 10, carbohydrate: 10, fat: 10, flavour: 10}
    };

    let commands = {
        restock: restock,
        prepare: prepare,
        report: report
    };

    return function (instructions) {
        let tokens = instructions.split(' ');
        let command = commands[tokens[0]];
        return command(tokens);
    };

    function restock(args) {
        let [microElement, quantity] = args.slice(1);
        microElement = microElement.toLowerCase();
        microElements[microElement] = microElements[microElement] + Number(quantity);
        return "Success";
    }

    function report() {
        return Object.keys(microElements).map(el => `${el}=${microElements[el]}`).join(' ');
    }

    function prepare(args) {
        let [recipe, quantity] = args.slice(1);
        recipe = recipe.toLowerCase();
        let meal = recipes[recipe];
        let isSuccess = true;
        let missingElement = "";
        for (let microElement in meal) {
            let microElementOnStock = microElements[microElement];
            let neededMicroElement = quantity * meal[microElement];

            if (microElementOnStock < neededMicroElement) {
                isSuccess = false;
                missingElement = microElement;
                break;
            }
        }
        if (!isSuccess) {
            return `Error: not enough ${missingElement} in stock`;
        } else {
            for (let microElement in meal) {
                microElements[microElement] -= quantity * meal[microElement];
            }
            return "Success";
        }
    }
})();

console.log(manager("restock carbohydrate 10"));
console.log(manager("restock flavour 10"));
console.log(manager("prepare apple 1"));
console.log(manager("restock fat 10"));
console.log(manager("prepare burger 1"));
console.log(manager("report"));


// manager("prepare cheverme 1");
// manager("restock protein 10");
// manager("prepare cheverme 1");
// manager("restock carbohydrate 10");
// manager("prepare cheverme 1");
// manager("restock fat 10");
// manager("prepare cheverme 1");
// manager("restock flavour 10");
// manager("prepare cheverme 1");
// manager("report");