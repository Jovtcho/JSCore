function isYearLeap(year) {
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        return "yes";
    } else {
        return "no";
    }
}

console.log(isYearLeap(2000));
console.log(isYearLeap(1999));
console.log(isYearLeap(1900));
