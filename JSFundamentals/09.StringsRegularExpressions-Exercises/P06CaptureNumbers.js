function captureNumbers(paramsArr) {
    let pattern = /\d+/g;
    let nums = [];

    // for (let str of paramsArr) {
    //     let match = pattern.exec(str);
    //     while (match !== null) {
    //         nums.push(match[0]);
    //         match = pattern.exec(str);
    //     }
    // }

    // let match = pattern.exec(paramsArr);
    // while (match){
    //     nums.push(match[0]);
    //     match = pattern.exec(paramsArr);
    // }
    //return nums.join(" ");

    let text = paramsArr.join(" ");
    let matches = text.match(pattern);
    return matches.join(" ");

}


console.log(captureNumbers(["The300", "What is that?", "I think it’s the 3rd movie.", "Lets watch it at 22:45"]));
