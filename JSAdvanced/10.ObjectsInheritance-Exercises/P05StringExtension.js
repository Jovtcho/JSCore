(function extendStringFuncs() {
    String.prototype.ensureStart = function (str) {
        if (!this.startsWith(str)) {
            return str + this;
        }
        return "" + this;
    };

    String.prototype.ensureEnd = function (str) {
        if (!this.endsWith(str)) {
            return this + str;
        }
        return "" + this;
    };

    String.prototype.isEmpty = function () {
        return this.length === 0;
    };

    String.prototype.truncate = function (n) {
        if (this.length <= n) {
            return "" + this;
        } else {
            if (n < 4) {
                return '.'.repeat(n);
            } else if (this.indexOf(' ') < 0) {
                return this.substr(0, n - 3) + '...';
            } else {
                let newStr = this.substring(0, n).trim();
                let indexOfSpace = newStr.lastIndexOf(' ');
                if (indexOfSpace > -1) {
                    return "" + newStr.substring(0, indexOfSpace) + '...';
                }
            }
        }
    };

    String.format = function (string) {
        let placeholderIndex = 0;
        for(let i = 1; i < arguments.length; i++, placeholderIndex++) {
            string = string
                .replace(`{${placeholderIndex}}`, arguments[i]);
        }

        return string;
    };

})();


let strTest = '';
//console.log(strTest.isEmpty());
//strTest = 'my string';

strTest = 'hello...';


strTest = String.format('The {0} {1} fox', 'quick', 'brown');
console.log(strTest);

// console.log(strTest.truncate(4));
// console.log(strTest.truncate(2));
//
// let testString = 'the quick brown fox jumps over the lazy dog';
// console.log(testString.truncate(10));
//
// testString = 'the quick brown fox jumps over the lazy dog';
// console.log(testString.truncate(25));
//
// testString = 'the quick brown fox jumps over the lazy dog';
// console.log(testString.truncate(43));
//
// testString = 'the quick brown fox jumps over the lazy dog';
// console.log(testString.truncate(45));

//
// let strTest = '';
// console.log(strTest.isEmpty());
// strTest = 'my string';
// console.log(strTest.isEmpty());
// console.log(strTest);
// strTest = strTest.ensureStart('my');
// console.log(strTest);
// strTest = strTest.ensureStart('hello ');
// console.log(strTest);
// strTest = strTest.ensureEnd(' Pesho');
// console.log(strTest);
// strTest = strTest.ensureEnd('sho');
// console.log(strTest);
//
