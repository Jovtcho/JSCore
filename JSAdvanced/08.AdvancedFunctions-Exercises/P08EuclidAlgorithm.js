function calcGreatestCommonDivisor(num1, num2) {
    let dividend = Math.max(num1, num2);
    let divisor = Math.min(num1, num2);

    while (divisor > 0) {
        let division = dividend % divisor;
        dividend = divisor;
        divisor = division;
    }

    return dividend;
}

console.log(calcGreatestCommonDivisor(252, 105));
console.log(calcGreatestCommonDivisor(18, 84));
console.log("================");


function calcGcd(num1, num2) {
    let dividend = Math.max(num1, num2);
    let divisor = Math.min(num1, num2);

    return gcd(dividend, divisor);

    function gcd(dividend, divisor) {
        if (divisor === 0) {
            return dividend;
        }
        //let division = dividend % divisor;

        return gcd(divisor, dividend % divisor);
    }
}

console.log(calcGcd(252, 105));
console.log(calcGcd(18, 84));