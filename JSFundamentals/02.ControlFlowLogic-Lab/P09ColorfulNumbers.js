function printColorfulNumbers(number) {
    let output = "<ul>\n";

    for (let i = 1; i <= number; i++) {
        let color = (i % 2 === 0) ? "blue" : "green";
        output += `  <li><span style='color:${color}'>${i}</span></li>\n`;
    }

    output += "</ul>\n";

    return output;
}

//console.log(printColorfulNumbers(10));