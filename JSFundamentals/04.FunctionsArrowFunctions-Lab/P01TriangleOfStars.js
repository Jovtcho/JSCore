function printTriangle(number) {

    function printStars(count) {
        console.log("*".repeat(count));
    }

    for (let i = 1; i <= number; i++) {
        printStars(i);
    }

    for (let i = number - 1; i >= 1; i--) {
        printStars(i);
    }
}

printTriangle();
printTriangle(3);
// printTriangle(5);
// printTriangle(1);