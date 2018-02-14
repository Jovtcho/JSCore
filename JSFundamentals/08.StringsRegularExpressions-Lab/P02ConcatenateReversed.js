function concatAndReverse(strArr) {
    let concatenatedStrArr = strArr.join("");
    //let reversedStr = concatenatedStrArr.split("").reverse().join("");
    let reversedStr = Array.from(concatenatedStrArr).reverse().join("");

    return reversedStr;
}

console.log(concatAndReverse(['I', 'am', 'student']));
console.log(concatAndReverse(['race', 'car']));