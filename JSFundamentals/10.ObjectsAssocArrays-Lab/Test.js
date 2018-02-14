arr = [["orange", 10], ["appple", 5], ["lemon", 13], ["banana", 20], ["cherry", 13], ["melon", 13]];

// arr.sort = function (a, b) {
//     return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0;
// };


console.log(arr.sort((a, b) => a[0] > b[0]).sort((a, b) => a[1] - b[1]));