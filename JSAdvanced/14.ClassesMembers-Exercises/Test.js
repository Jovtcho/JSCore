let test = (function generateId() {
    let id = 0;
    return function () {
        return id++;
    }
})();

console.log(test());
console.log(test());
console.log(test());
console.log(test());