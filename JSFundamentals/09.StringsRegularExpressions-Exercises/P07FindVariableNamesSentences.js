function findNamesInSentence(str) {
    let pattern = /\b_([A-Za-z0-9]+)\b/g;
    let names = [];

    let match = pattern.exec(str);
    while (match) {
        names.push(match[1]);
        match = pattern.exec(str);
    }

    return names.join(",");
}


console.log(findNamesInSentence("The _id and _age variables are both integers."));
console.log(findNamesInSentence("Calculate the _area of the _perfectRectangle object."));
console.log(findNamesInSentence("__invalidVariable _evenMoreInvalidVariable_ _validVariable _validVariable2"));