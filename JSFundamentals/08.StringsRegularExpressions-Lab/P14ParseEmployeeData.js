function parseEmployeeDate(paramsArr) {
    // let regex = /^([A-Z][a-zA-Z]*) - ([1-9][0-9]*) - ([A-Za-z0-9 -]+)$/g;
    // let employeeData = [];
    //
    // for (let element of paramsArr) {
    //     let match;
    //
    //     while (match = regex.exec(element)) {
    //         employeeData.push(`Name: ${match[1]}\nPosition: ${match[3]}\nSalary: ${match[2]}`);
    //     }
    // }
    //
    // return employeeData.join("\n");

    let regex = /^([A-Z][a-zA-Z]*) - ([1-9][0-9]*) - ([A-Za-z0-9 -]+)$/;
    let employeeData = [];

    for (let element of paramsArr) {
        //let regex = /^([A-Z][a-zA-Z]*) - ([1-9][0-9]*) - ([A-Za-z0-9 -]+)$/g;
        let match = regex.exec(element);

        if (match) {
            employeeData.push(`Name: ${match[1]}\nPosition: ${match[3]}\nSalary: ${match[2]}`);
        }
    }

    return employeeData.join("\n");
}

console.log(parseEmployeeDate(["Isacc - 1000 - CEO", "Peter - 500 - Employee", "Ivan - 500 - Employee",
    "Pesho - 1500 - Employee", "Misho - 500 - Employee"]));
//console.log(parseEmployeeDate(["Peter - 500 - Employee", "Isacc - 1000 - CEO", "Ivan - 500 - Employee"]));