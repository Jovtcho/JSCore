function generateFibonacci(count) {
    let index = 2;
    let currentSequence = [1, 1];

    function fibonacci(count, currentSequence, index) {
        if (count === currentSequence.length) {
            return currentSequence;
        }

        currentSequence.push(currentSequence[index - 1] + currentSequence[index - 2]);
        index++;
        return fibonacci(count, currentSequence, index);
    }

    fibonacci(count, currentSequence, index);
    return currentSequence;
}

console.log(generateFibonacci(8));