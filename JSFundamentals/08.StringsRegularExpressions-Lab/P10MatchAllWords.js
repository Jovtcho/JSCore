function matchAllWords(text) {
    //let wordPattern = new RegExp(/\w+/, "g");
    let wordPattern = /\w+/g;
    let output = text.match(wordPattern);

    return output.join("|");
}

console.log(matchAllWords('A Regular Expression needs to have the global flag in order to match all occurrences in the text'));
console.log(matchAllWords('_(Underscores) are also word characters'));