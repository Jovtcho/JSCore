function extractUniqueWords(paramsArr) {
    let text = paramsArr.join(" ");
    let words = text.split(/\W+/).filter(el => el !== "").map(el => el.toLowerCase());
    let wordsSet = new Set();

    for (let word of words) {
        wordsSet.add(word);
    }

    return [...wordsSet].join(", ");
}

console.log(extractUniqueWords([
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit dui.",
    "Quisque fringilla est urna, vitae efficitur urna vestibulum fringilla.",
    "Vestibulum dolor diam, dignissim quis varius non, fermentum non felis.",
    "Vestibulum ultrices ex massa, sit amet faucibus nunc aliquam ut.",
    "Morbi in ipsum varius, pharetra diam vel, mattis arcu.",
    "Integer ac turpis commodo, varius nulla sed, elementum lectus.",
    "Vivamus turpis dui, malesuada ac turpis dapibus, congue egestas metus."
]));