function capitalizeWords(text) {
    //let words = text.split(/\s+/g).filter(el => el !== "");

    //let outputText = [];
    // for (let word of words) {
    //     word = word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
    //     outputText.push(word);
    // }
    // return outputText.join(" ");

    return text.split(/\s+/g).filter(el => el !== "")
        .map(word => word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase())
        .join(" ");

}

console.log(capitalizeWords("Was that Easy? tRY thIs onE for SiZe!"));