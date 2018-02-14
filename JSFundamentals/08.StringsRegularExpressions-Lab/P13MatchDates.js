function matchDates(paramsArr) {
    let dateRegex = /\b(\d{1,2})-([A-Z][a-z]{2})-(\d{4})\b/g;
    let dates = [];

    // for (let sentence of paramsArr) {
    //     let match;
    //     while (match = dateRegex.exec(sentence)) {
    //         let outputDate = `${match[0]} (Day: ${match[1]}, Month: ${match[2]}, Year: ${match[3]})`;
    //         dates.push(outputDate);
    //     }
    // }

    for (let sentence of paramsArr) {
        let match = dateRegex.exec(sentence);
        while (match !== null) {
            let outputDate = `${match[0]} (Day: ${match[1]}, Month: ${match[2]}, Year: ${match[3]})`;
            dates.push(outputDate);

            match = dateRegex.exec(sentence);
        }
    }

    return dates.join("\n");
}


console.log(matchDates(["I am 10-Dec-1234 born on 30-Dec-1994.",
    "This is not date: 512-Jan-1996.",
    "My father is born on the 29-Jul-1955."]));