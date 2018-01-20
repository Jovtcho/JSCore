function calcCompoundInterest(paramsArr) {
    let principalSum = paramsArr[0];
    let interestRate = paramsArr[1];
    let compoundingPeriod = paramsArr[2];
    let totalTime = paramsArr[3];

    let interestRatePercent = interestRate / 100;
    let compoundingFreq = 12 / compoundingPeriod;

    let compoundInterest = principalSum * Math.pow((1 + interestRatePercent / compoundingFreq), (compoundingFreq * totalTime));

    return compoundInterest.toFixed(2);
}

console.log(calcCompoundInterest([1500, 4.3, 3, 6]));
console.log(calcCompoundInterest([100000, 5, 12, 25]));
