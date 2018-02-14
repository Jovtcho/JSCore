function splitByExpression(str) {
    //let splitRegex = /[\s]+|[(),;\.]/g;
    let splitRegex = /[\s(),;\.]+/g;

    let output = str.split(splitRegex).filter(el => el !== "");

    return output.join("\n");
}

//console.log(splitByExpression('let sum = 4 * 4,b = "wow";'));
console.log(splitByExpression('let sum = 1 + 2;if(sum > 2){\tconsole.log(sum);}'));
