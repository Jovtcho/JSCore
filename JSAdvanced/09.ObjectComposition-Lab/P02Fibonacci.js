function generateFibonacci(num) {
    let fib = (function nextFib() {
        let fib0 = 1;
        let fib1 = 1;

        return function () {
            let nextFibonacci = fib0 + fib1;
            fib0 = fib1;
            fib1 = nextFibonacci;
            return nextFibonacci;
        };
    })();

    let fibonacci = [1, 1];
    for (let index = 0; index < num - 2; index++) {
        fibonacci.push(fib());
    }

    return fibonacci;
}


// console.log(generateFibonacci(5));
// console.log(generateFibonacci(15));

function nextFibGenerator() {
    let fib0 = 0;
    let fib1 = 1;

    return function () {
        let nextFibonacci = fib0 + fib1;
        fib0 = fib1;
        fib1 = nextFibonacci;
        return fib0;
    };
}

let fib = nextFibGenerator();
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());