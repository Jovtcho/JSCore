function countWords(paramsArr) {
    let text = paramsArr.join(" ");
    let words = text.split(/\W+/g).filter(el => el !== "").map(el => el.toLowerCase());

    let countedWords = new Map();

    for (let word of words) {
        if (!countedWords.has(word)) {
            countedWords.set(word, 0);
        }

        countedWords.set(word, countedWords.get(word) + 1);
    }

    let keys = Array.from(countedWords.keys()).sort();
    for (let key of keys) {
        console.log(`'${key}' -> ${countedWords.get(key)} times`);
    }
}

countWords(["Far too slow, you're far too slow."]);
countWords(["JS devs use Node.js for server-side JS. JS devs use JS. -- JS for devs --"]);