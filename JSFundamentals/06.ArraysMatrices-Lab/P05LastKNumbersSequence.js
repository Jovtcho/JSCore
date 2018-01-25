function printLastKNumsSequence(nums, k) {
    let outputArr = [1];

    for (let index = 1; index < nums; index++) {
        let start = Math.max(0, index - k);
        let tempArr = outputArr.slice(start, index);
        outputArr[index] = tempArr.reduce((acc, el) => acc + el, 0);
    }

    return outputArr.join(" ");
}

console.log(printLastKNumsSequence(6, 3));
console.log(printLastKNumsSequence(8, 2));