function assembleCar(carOrder) {
    let model = carOrder.model;
    let power = carOrder.power;
    let color = carOrder.color;
    let carriage = carOrder.carriage;
    let wheelSize = carOrder.wheelsize;

    let enginesOnStock = {
        smallEngine: {power: 90, volume: 1800},
        normalEngine: {power: 120, volume: 2400},
        monsterEngine: {power: 200, volume: 3500}
    };

    let carriageOnStock = {
        hatchback: {type: 'hatchback', color: ''},
        coupe: {type: 'coupe', color: ''}
    };

    let car = {
        model: model
    };
    for (let engineCar in enginesOnStock) {
        if (enginesOnStock[engineCar].power >= power) {
            car.engine = enginesOnStock[engineCar];
            break;
        }
    }

    let neededCarriage = carriageOnStock[carriage];
    neededCarriage.color = color;
    car.carriage = neededCarriage;

    let wheelsSize = [wheelSize, wheelSize, wheelSize, wheelSize];
    if (wheelSize % 2 === 0) {
        wheelSize--;
        wheelsSize = [wheelSize, wheelSize, wheelSize, wheelSize];
    }

    car.wheels = wheelsSize;
    return car;
}

console.log(assembleCar({
        model: 'VW Golf II',
        power: 90,
        color: 'blue',
        carriage: 'hatchback',
        wheelsize: 14
    }
));

console.log(assembleCar({
        model: 'Opel Vectra',
        power: 110,
        color: 'grey',
        carriage: 'coupe',
        wheelsize: 17
    }
));