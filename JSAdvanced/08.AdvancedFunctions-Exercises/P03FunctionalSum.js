let result = (function () {
    let sum = 0;

    return function add(num) {
        sum += num;
        add.toString = function () {
            return sum;
        };

        return add;
    }
})();


console.log(""+result(45)(45)(56));

let test = (function () {
    let sum = 0;

    return function add(number) {
        sum += number;
        add.toString = function () {
            return sum;
        };

        return add;
    }
})();


console.log(String(test(45)(45)(56)));

function add(a) {
    let sum = a;

    function add_and_repeat(b) {
        if (b) {
            sum += b;
            return add_and_repeat;
        }
        else
            return sum;
    }

    add_and_repeat.toString = function () {
        return sum
    };

    return add_and_repeat;
}

console.log(add(45)(5)(6));

function addSecond(x) {
    return function (y) {
        if (typeof y !== 'undefined') {
            x = x + y;
            return arguments.callee;
        } else {
            return x;
        }
    };
}
console.log(addSecond(1)(2)(3)()); //6
console.log(addSecond(1)(1)(1)(1)(1)(1)()); //6