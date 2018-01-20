function convertToImperialUnits(number) {
    let footToInch = 12;

    let foots = Math.floor(number / footToInch);
    let inches = number % footToInch;

    return `${foots}'-${inches}"`;
}

console.log(convertToImperialUnits(36));
console.log(convertToImperialUnits(55));
console.log(convertToImperialUnits(11));
