function wordsToUpperCase(text) {
    let textToUpper = text.toUpperCase();

    function textToWords(textToSplit) {
        return textToSplit.split(/\W+/);
    }

    let words = textToWords(textToUpper);
    words = words.filter(word => word !== "");

    return words.join(", ");
}


console.log(wordsToUpperCase("Hi, how are you?"));
console.log(wordsToUpperCase("Test"));