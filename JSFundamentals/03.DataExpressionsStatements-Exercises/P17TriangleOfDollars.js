function drawTriangleOfDollars(number) {

    //Method I
    let output = "";

    for (let row = 0; row < number; row++) {
        for (let col = 0; col <= row; col++) {
            output += "$";
        }
        output += "\n";
    }

    return output;

    // method II
    // for (let row = 1; row <= number; row++) {
    //     console.log(new Array(row + 1).join("$"));
    // }


    //method III
    // for (let row = 1; row <= number; row++) {
    //     console.log("$".repeat(row));
    // }
}

drawTriangleOfDollars(5);

// console.log(drawTriangleOfDollars(3));
// console.log(drawTriangleOfDollars(2));
// console.log(drawTriangleOfDollars(4));