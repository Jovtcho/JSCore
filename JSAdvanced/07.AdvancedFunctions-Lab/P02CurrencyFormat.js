function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2, 2);
    if (symbolFirst) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}

function getDollarFormatter(formatterFunc) {
    function dollarFormatter(value) {
        //Return value from currencyFormatter function. Three of the parameters are hardcorded.
        //Only one parameter is coming from outside.
        return formatterFunc(",", "$", true, value);
    }

    //return function dollarFormatterResult(value) which receive only one parameter.
    return dollarFormatter;
}


console.log(currencyFormatter(',', '$', true, 1000));

let dollarFormatterResult = getDollarFormatter(currencyFormatter);
console.log(dollarFormatterResult(5345));   // $ 5345,00
console.log(dollarFormatterResult(3.1429)); // $ 3,14
console.log(dollarFormatterResult(2.709));  // $ 2,71
