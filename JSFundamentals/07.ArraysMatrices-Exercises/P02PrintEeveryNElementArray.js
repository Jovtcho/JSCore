function printEveryNElement(arr) {
    let step = Number(arr.pop());

    for (let index = 0; index < arr.length; index += step) {
        console.log(arr[index]);
    }
}

printEveryNElement(["dsa", "asd", "test", "tset", "2"]);