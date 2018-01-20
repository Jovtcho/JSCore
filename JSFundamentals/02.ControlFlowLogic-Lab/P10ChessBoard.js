function generateChessBoard(number) {
    let output = "<div class=\"chessboard\">\n";

    for (let row = 0; row < number; row++) {
        output += "  <div>\n";

        for (let col = 0; col < number; col++) {
            let color = ((row + col) % 2 === 0) ? "black" : "white";
            output += `    <span class=\"${color}\"></span>\n`;
        }

        output += "  </div>\n";
    }

    output += "</div>\n";

    return output;
}

console.log(generateChessBoard(3));