function createUsernameCatalogue(paramsArr) {
    let usernameCatalogue = new Set();

    for (let line of paramsArr) {
        usernameCatalogue.add(line);
    }

    Array.from(usernameCatalogue)
        .sort((a, b) => {
            if (a.length === b.length) {
                return a.localeCompare(b);
            }

            return a.length - b.length;
        })
        .forEach(el => console.log(el));
}

createUsernameCatalogue([
    "Ashton",
    "Kutcher",
    "Ariel",
    "Lilly",
    "Keyden",
    "Aizen",
    "Billy",
    "Braston"
]);

console.log();
createUsernameCatalogue([
    "Denise",
    "Ignatius",
    "Iris",
    "Isacc",
    "Indie",
    "Dean",
    "Donatello",
    "Enfuego",
    "Benjamin",
    "Biser",
    "Bounty",
    "Renard",
    "Rot"
]);