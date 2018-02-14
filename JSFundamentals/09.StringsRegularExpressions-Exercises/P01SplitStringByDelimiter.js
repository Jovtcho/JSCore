function splitString(text, delimiter) {
    let output = text.split(delimiter);

    return output.join("\n");
}

console.log(splitString("One-Two-Three-Four-Five", "-"));