function processor(paramsArr) {
    let execute = (function () {
        let output = [];
        return {
            add: (str) => output.push(str),
            remove: (str) => output = output.filter(el => el !== str),
            print: () => console.log(output.join(","))
        };
    })();

    for (let token of paramsArr) {
        let [command, arg] = token.split(' ');
        execute[command](arg);
    }
}

processor(['add hello', 'add again', 'remove hello', 'add again', 'print']);