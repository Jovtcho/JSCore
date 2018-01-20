function isOddOrEven(number) {
    if (number % 2 === 0) {
        console.log("even");
    } else if (Math.abs(number % 2) === 1) {
        console.log("odd");
    } else {
        console.log("invalid");
    }
}

isOddOrEven(5);
isOddOrEven(8);
isOddOrEven(1.5);
isOddOrEven(3);
isOddOrEven(-3);

function oddEven(num) {
    let rem = num % 2;
    let roundedRem = Math.round(rem);
    if (rem === 0) {
        console.log("even");
    }
    else if (rem === roundedRem) {
        console.log("odd");
    }
    else {
        console.log("invalid");
    }
}

oddEven(-3);
oddEven(5);
oddEven(8);
oddEven(1.5);
oddEven(3);
