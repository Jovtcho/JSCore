function calculate(a, b, operator) {

    function execute(a, b, executionFunc) {
        return executionFunc(a, b);
    }

    let add = function (a, b) {
        return a + b;
    };
    let subtract = function (a, b) {
        return a - b;
    };
    let multiply = function (a, b) {
        return a * b;
    };
    let divide = function (a, b) {
        return a / b;
    };

    switch (operator) {
        case "+":
            return execute(a, b, add);
        case "-":
            return execute(a, b, subtract);
        case "*":
            return execute(a, b, multiply);
        case "/":
            return execute(a, b, divide);
    }
}

console.log(calculate(4, 5, "+"));
console.log(calculate(4, 5, "-"));
console.log(calculate(4, 5, "*"));
console.log(calculate(4, 5, "/"));

