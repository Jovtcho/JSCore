function findNegativePositiveNums(arr) {
    let resultArr = [];
    for (let num of arr) {
        num >= 0 ? resultArr.push(num): resultArr.unshift(num);
    }

    return resultArr.join("\n");
}


console.log(findNegativePositiveNums([7, -2, 8, 9]));
console.log(findNegativePositiveNums([3, -2, 0, -1]));