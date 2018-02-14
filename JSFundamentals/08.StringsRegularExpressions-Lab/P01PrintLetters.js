function printAllLetters(str) {
    for (let index in str) {
        console.log(`str[${index}] -> ${str[index]}`);
    }
}

printAllLetters("Hello, World!");