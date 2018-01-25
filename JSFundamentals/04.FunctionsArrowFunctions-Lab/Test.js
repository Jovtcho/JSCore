function checkNumber(param) {
    if (param > 0) {
        return "Positive";
    }

    if (param < 0) {
        return "Negative";
    }

    if (Number(param) === 0) {
        console.log(typeof param);
        return param;
    }
}


console.log(checkNumber(-10));
console.log(checkNumber(2));
console.log(checkNumber(0));
