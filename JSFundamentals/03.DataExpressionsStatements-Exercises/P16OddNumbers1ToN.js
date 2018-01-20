function printOddNumbersToN(number) {
    for (let i = 1; i <= number; i++) {
        if (i % 2 === 1) {
            console.log(i);
        }
    }

    // for (let i = 1; i <= number; i += 2) {
    //     console.log(i);
    // }
}

printOddNumbersToN(5);
printOddNumbersToN(4);
printOddNumbersToN(7);
