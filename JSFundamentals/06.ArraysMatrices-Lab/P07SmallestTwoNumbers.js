function findSmallestTwoNums(arr) {
    return arr.sort((el1, el2) => el1 - el2).slice(0, 2).join(" ");
}

(arr) => arr.sort((el1, el2) => el1 - el2).slice(0, 2).join(" ");

console.log(findSmallestTwoNums([30, 15, 50, 5]));
console.log(findSmallestTwoNums([3, 0, 10, 4, 7, 3]));