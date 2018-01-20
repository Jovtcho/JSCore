function isPrime(number) {
    let loopLimit = Math.floor(Math.sqrt(number));
    let isNumPrime = true;

    for (let i = 2; i <= loopLimit; i++) {
        if (number % i === 0) {
            isNumPrime = false;
        }
    }

    return isNumPrime && number > 1;
}

console.log(isPrime(0));
console.log(isPrime(1));
console.log(isPrime(2));
console.log(isPrime(3));
console.log(isPrime(4));
console.log(isPrime(5));
console.log(isPrime(6));
console.log(isPrime(7));
console.log(isPrime(8));
console.log(isPrime(9));
console.log(isPrime(10));
console.log(isPrime(11));
console.log(isPrime(81));