function addRemoveInArr(commandsArr) {
    let num = 0;
    let outputArr = [];

    for (let command of commandsArr) {
        num++;
        if (command === "add") {
            outputArr.push(num);
            continue;
        }

        if (command === "remove" && outputArr.length !== 0) {
            outputArr.pop();
        }
    }

    return outputArr.length === 0 ? "Empty" : outputArr.join("\n");
}


//console.log(addRemoveInArr(["add", "add", "add", "add"]));
//console.log(addRemoveInArr(["add", "add", "remove", "add", "add"]));
//console.log(addRemoveInArr(["remove", "remove", "remove"]));
console.log(addRemoveInArr(["remove", "remove", "remove", "add"]));
