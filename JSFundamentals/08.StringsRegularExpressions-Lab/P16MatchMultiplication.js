function multiply(text) {
    let pattern = /(\-?\d+\.*\d*)\s*\*\s*(\-?\d+\.*\d*)/g;
    // text = text.replace(pattern, (match, num1, num2) => Number(num1) * Number(num2));
    // console.log(text);

    let match = text.match(pattern);
    console.log(match);
    console.log();

    let exec = pattern.exec(text);

    while (exec) {
        console.log(exec);
        exec = pattern.exec(text);
    }


}

multiply("My bill: 2*2.50 (beer); 2* 1.20 (kepab); -2  * 0.5 (deposit).");