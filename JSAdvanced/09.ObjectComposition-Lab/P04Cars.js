function executeCommands(tokens) {
    let cars = new Map();
    let commands = (function () {
        return {
            create: function (args) {
                if (args.length === 1) {
                    cars.set(args[0], {});
                } else {
                    let [name, command, parentName] = args;
                    let newCar = Object.create(cars.get(parentName));
                    cars.set(name, newCar);
                }
            },
            set: function (args) {
                let [name, property, value] = args;
                let car = cars.get(name);
                car[property] = value;
                //cars.set(name, car);
            },
            print: function (args) {
                let car = cars.get(args[0]);
                let properties = [];
                for (let property in car) {
                    properties.push(`${property}:${car[property]}`);
                }
                console.log(properties.join(', '));
            }
        };
    })();

    for (let token of tokens) {
        let command = token.split(' ');
        commands[command[0]](command.slice(1));
    }
}


executeCommands(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']
);