function findElementsOnEvenPos(arr) {
    return arr.filter((e, i) => i % 2 === 0).join(" ");
}

let test = (arr) => arr.filter((e, i) => i % 2 === 0).join(" ");

console.log(findElementsOnEvenPos(['20', '30', '40']));
console.log(findElementsOnEvenPos(['5', '10']));


