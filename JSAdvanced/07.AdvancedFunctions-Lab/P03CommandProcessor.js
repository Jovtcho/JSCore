function solve(commands) {
    let commandProcessor = (function () {
        let output = '';
        return {
            'append': (str) => output += str,
            'removeStart': (count) => output = output.slice(count),
            'removeEnd': (count) => output = output.slice(0, output.length - count),
            'print': () => console.log(output)
        };
    })();

    for (let token of commands) {
        let [command, argument] = token.split(' ');
        commandProcessor[command](argument);
    }
}

function solve2(commands) {
    let commandProcessor = (function () {
        let output = '';
        return function (token) {
            let [command, argument] = token.split(' ');
            switch (command) {
                case 'append':
                    output += argument;
                    break;
                case 'removeStart':
                    output = output.slice(argument);
                    break;
                case 'removeEnd':
                    output = output.slice(0, output.length - argument);
                    break;
                case 'print':
                    console.log(output);
                    break;
            }
        }
    })();

    for (let command of commands) {
        commandProcessor(command);
    }
}

solve(['append hello',
    'append again',
    'removeStart 3',
    'removeEnd 4',
    'print']);

solve2(['append hello',
    'append again',
    'removeStart 3',
    'removeEnd 4',
    'print']);