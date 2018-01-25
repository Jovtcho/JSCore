function processNumsOnOddPos(arr) {
    return arr
        .filter((el, i) => i % 2 !== 0)
        .map(el => el * 2)
        .reverse()
        .join(" ");
}

(arr) => arr.filter((el, i) => i % 2 !== 0).map(el => el * 2).reverse().join(" ");

console.log(processNumsOnOddPos([10, 15, 20, 25]));
console.log(processNumsOnOddPos([3, 0, 10, 4, 7, 3]));
