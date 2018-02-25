function sortArray(arr, sortMethod) {
    let order = {
        asc: (a, b) => a - b,
        desc: (a, b) => b - a
    };

    return arr.sort(order[sortMethod]);
}

console.log(sortArray([14, 7, 17, 6, 8], 'asc'));
console.log(sortArray([14, 7, 17, 6, 8], 'desc'));