function countWordsInText(paramsArr) {
    let text = paramsArr.join(" ");
    let words = text.split(/\W+/g).filter(el => el !== "");
    let wordsCount = {};

    for (let word of words) {
        // if (!wordsCount.hasOwnProperty(word)) {
        //     wordsCount[word] = 0;
        // }
        //
        // wordsCount[word]++;

        wordsCount[word] ? wordsCount[word]++ : wordsCount[word] = 1;
    }

    return JSON.stringify(wordsCount);
}

function countWords(inputLines) {
    let text = inputLines.join('\n');
    let words = text.split(/[^A-Za-z0-9_]+/)
        .filter(w => w !== '');
    let wordsCount = {};
    for (let w of words)
        wordsCount[w] ? wordsCount[w]++ :
            wordsCount[w] = 1;
    return JSON.stringify(wordsCount);
}


console.log(countWordsInText(["Far too slow, you're far too slow."]));

console.log(countWords(["Far too slow, you're far too slow."]));