function isEndsWithSubstr(str, substr) {
    let output = str.substring(str.length - substr.length) === substr;
    //let output = str.endsWith(substr);

    return output;
}

console.log(isEndsWithSubstr("This is Houston, we have…", "We have…"));
console.log(isEndsWithSubstr("This sentence ends with fun?", "fun?"));