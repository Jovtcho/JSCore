function extractNonDecreasingSubsequence(arr) {
    let theBiggest = arr[0];
    let outputArr = [];
    outputArr.push(theBiggest);
    for (let index = 1; index < arr.length; index++) {
        if (arr[index] >= theBiggest) {
            outputArr.push(arr[index]);
            theBiggest = arr[index];
        }
    }

    return outputArr.join("\n");
}


console.log(extractNonDecreasingSubsequence([1, 3, 8, 4, 10, 12, 3, 2, 24]));
console.log(extractNonDecreasingSubsequence([20, 3, 2, 15, 6, 1]));
console.log(extractNonDecreasingSubsequence([1, 2, 3, 4, 5, 6]));