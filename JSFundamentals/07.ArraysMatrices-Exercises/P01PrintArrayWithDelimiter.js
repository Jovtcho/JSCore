function printArr(arr) {
    let delimiter = arr.pop();

    return arr.join(delimiter);
}


console.log(printArr(["One", "Two", "Three", "Four", "Five", "-"]));