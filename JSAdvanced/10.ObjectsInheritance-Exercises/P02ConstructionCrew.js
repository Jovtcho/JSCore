function modifyObject(worker) {
    let isHandShake = worker.handsShaking;
    if (isHandShake) {
        fixHandShake(worker);
        worker.handsShaking = false;
    }

    function fixHandShake() {
        let neededAlcPerKgYear = 0.1;
        worker.bloodAlcoholLevel += worker.weight * worker.experience * neededAlcPerKgYear;
    }

    return worker;
}

console.log(modifyObject({
        weight: 80,
        experience: 1,
        bloodAlcoholLevel: 0,
        handsShaking: true
    }
));

console.log(modifyObject({
        weight: 95,
        experience: 3,
        bloodAlcoholLevel: 0,
        handsShaking: false
    }
));