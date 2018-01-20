/**
 * Created by Jo on 1/9/2018.
 */

function concatenateNumbers(number) {
    let concatenatedNumbers = "";

    for (let i = 1; i <= number; i++) {
        concatenatedNumbers += i;
    }

    return concatenatedNumbers;
}

console.log(concatenateNumbers(11));