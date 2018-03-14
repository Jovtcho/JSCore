class Console {
    static get placeholder() {
        return /{\d+}/g;
    }

    static writeLine() {
        let message = arguments[0];
        if (arguments.length === 1) {
            if (typeof (message) === 'object') {
                message = JSON.stringify(message);
                return message;
            }
            else if (typeof(message) === 'string') {
                return message;
            }
        }
        else {
            if (typeof (message) !== 'string') {
                throw new TypeError("No string format given!");
            }
            else {
                let tokens = message.match(this.placeholder).sort(function (a, b) {
                    a = Number(a.substring(1, a.length - 1));
                    b = Number(b.substring(1, b.length - 1));
                    return a - b;
                });
                if (tokens.length !== (arguments.length - 1)) {
                    throw new RangeError("Incorrect amount of parameters given!");
                }
                else {
                    for (let i = 0; i < tokens.length; i++) {
                        let number = Number(tokens[i].substring(1, tokens[i].length - 1));
                        if (number !== i) {
                            throw new RangeError("Incorrect placeholders given!");
                        }
                        else {
                            message = message.replace(tokens[i], arguments[i + 1])
                        }
                    }
                    return message;
                }
            }
        }
    }
}

// console.log(Console.writeLine("The sum of {0} and {1} is {2}", 3, 4, 7));
// console.log(Console.writeLine("The sum."));
// console.log(Console.writeLine({name: 'Pesho', age: 12}));

let expect = require('chai').expect;
let assert = require('chai').assert;

describe('Class Console tests', function () {
    describe('Test with valid data', function () {
        it('Test with string input', function () {
            expect(Console.writeLine('Gosho')).to.be.equal('Gosho');
        });

        it('Test with object input', function () {
            expect(Console.writeLine({name: 'Pesho', age: 12})).to.be.equal('{"name":"Pesho","age":12}');
        });

        it('Test with template string and parameters input', function () {
            expect(Console.writeLine("The sum of {0} and {1} is {2}", 3, 4, 7))
                .to.be.equal('The sum of 3 and 4 is 7');
        });

        it('Test with template string and parameters input', function () {
            expect(Console.writeLine("The sum of {0} and {1} is {2}, The sum of {3} and {4} is {5}," +
                " The sum of {6} and {7} is {8}, The sum of {9} and {10} is {11}", 3, 4, 7, 3, 4, 7, 3, 4, 7, 3, 4, 7))
                .to.be.equal('The sum of 3 and 4 is 7, The sum of 3 and 4 is 7,' +
                ' The sum of 3 and 4 is 7, The sum of 3 and 4 is 7');
        });
    });

    describe('Test with invalid data', function () {
        it('Test with no string input', function () {
            expect(() => Console.writeLine([], {})).to.throw(TypeError, "No string format given!");
        });

        it('Test with empty input', function () {
            expect(() => Console.writeLine()).to.throw(TypeError, "No string format given!");
        });

        it('Test with incorrect amount of parameters input', function () {
            expect(() => Console.writeLine("The sum of {0} and {1} is {2}", 7))
                .to.throw(RangeError, "Incorrect amount of parameters given!");
        });

        it('Test with incorrect placeholders input', function () {
            expect(() => Console.writeLine("The sum of {9} and {1} is {3}", 3, 4, 7))
                .to.throw(RangeError, "Incorrect placeholders given!");
        });
    });
});