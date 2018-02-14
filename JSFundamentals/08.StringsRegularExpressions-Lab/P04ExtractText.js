function extractText(text) {
    let outputArr = [];

    let indexOpenParenthesis = text.indexOf("(");
    let indexCloseParenthesis = text.indexOf(")", indexOpenParenthesis);

    while (indexOpenParenthesis > -1 && indexCloseParenthesis > -1) {
        let currentStr = text.substring(indexOpenParenthesis + 1, indexCloseParenthesis);
        outputArr.push(currentStr);

        indexOpenParenthesis = text.indexOf("(", indexCloseParenthesis);
        indexCloseParenthesis = text.indexOf(")", indexOpenParenthesis);
    }

    return outputArr.join(", ");
}

console.log(extractText('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)'));