function assignProperties(paramsArr) {
    let person = {};

    for (let i = 0; i < paramsArr.length; i += 2) {
        person [paramsArr[i]] = paramsArr[i + 1];
    }

    //let person = {[paramsArr[0]]: paramsArr[1], [paramsArr[2]]: paramsArr[3], [paramsArr[4]]: paramsArr[5]};

    return person;
}

console.log(assignProperties(['name', 'Pesho', 'age', '23', 'gender', 'male']));
console.log(assignProperties(['ssid', '90127461', 'status', 'admin', 'expires', '600']));
