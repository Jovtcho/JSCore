function isOverTheSpeed(paramsArr) {
    let motorwayLimit = 130;
    let interstateLimit = 90;
    let cityLimit = 50;
    let residentialLimit = 20;

    let driverSpeed = paramsArr[0];
    let area = paramsArr[1];

    function isInLimit(limit, speed) {
        if (speed <= limit) {
            return "";
        }
        if (speed <= limit + 20) {
            return "speeding";
        }
        if (speed <= limit + 40) {
            return "excessive speeding";
        }
        return "reckless driving";
    }

    switch (area.toLowerCase()) {
        case "motorway":
            return isInLimit(motorwayLimit, driverSpeed);
        case "interstate":
            return isInLimit(interstateLimit, driverSpeed);
        case "city":
            return isInLimit(cityLimit, driverSpeed);
        case "residential":
            return isInLimit(residentialLimit, driverSpeed);
    }
}

console.log(isOverTheSpeed([40, "city"]));
console.log(isOverTheSpeed([21, "residential"]));
console.log(isOverTheSpeed([120, "interstate"]));
console.log(isOverTheSpeed([200, "motorway"]));
