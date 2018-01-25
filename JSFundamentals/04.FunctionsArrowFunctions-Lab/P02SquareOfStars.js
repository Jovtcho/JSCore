function printSquare(number = 5) {
    function printStars(count) {
        console.log("* ".repeat(count).trim());
    }

    for (let i = 0; i < number; i++) {
        printStars(number);
    }
}

printSquare(4);
printSquare();