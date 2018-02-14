function findWordInSentence(text, word) {
    let pattern = new RegExp(`\\b${word}\\b`, "gi");
    let matches = text.match(pattern);

    return matches === null ? 0 : matches.length;
}

console.log(findWordInSentence("The waterfall was so high, that the child couldn’t see its peak.", "the"));