function rotateArr(arr) {
    let rotateCount = Number(arr.pop());

    for (let index = 0; index < rotateCount % arr.length; index++) {
        let element = arr.pop();
        arr.unshift(element);
    }

    return arr.join(" ");
}


console.log(rotateArr(["1", "2", "3", "4", "2"]));
console.log(rotateArr(["Banana", "Orange", "Coconut", "Apple", "15"]));