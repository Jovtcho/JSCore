function printFirstAndLastKNums(arr) {
    let k = arr.shift();
    //let k = arr.splice(0, 1);

    console.log(arr.slice(0, k).join(" "));
    console.log(arr.slice(-k).join(" "));
    //console.log(arr.slice(arr.length - k).join(" "));
}

printFirstAndLastKNums([2, 7, 8, 9]);
printFirstAndLastKNums([3, 6, 7, 8, 9]);