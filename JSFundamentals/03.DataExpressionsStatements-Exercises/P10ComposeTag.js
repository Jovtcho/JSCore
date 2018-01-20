function composeTag(paramsArr) {
    let source = paramsArr[0];
    let alternative = paramsArr[1];

    let tag = `<img src="${source}" alt="${alternative}">`;

    return tag;
}

console.log(composeTag(['smiley.gif', 'Smiley Face']));