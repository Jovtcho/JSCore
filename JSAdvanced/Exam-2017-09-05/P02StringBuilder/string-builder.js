class StringBuilder {
    constructor(string) {
        if (string !== undefined) {
            StringBuilder._vrfyParam(string);
            this._stringArray = Array.from(string);
        } else {
            this._stringArray = [];
        }
    }

    append(string) {
        StringBuilder._vrfyParam(string);
        for (let i = 0; i < string.length; i++) {
            this._stringArray.push(string[i]);
        }
    }

    prepend(string) {
        StringBuilder._vrfyParam(string);
        for (let i = string.length - 1; i >= 0; i--) {
            this._stringArray.unshift(string[i]);
        }
    }

    insertAt(string, startIndex) {
        StringBuilder._vrfyParam(string);
        this._stringArray.splice(startIndex, 0, ...string);
    }

    remove(startIndex, length) {
        this._stringArray.splice(startIndex, length);
    }

    static _vrfyParam(param) {
        if (typeof param !== 'string') throw new TypeError('Argument must be string');
    }

    toString() {
        return this._stringArray.join('');
    }
}

//let str = new StringBuilder(5);
// str.append(', there');
// str.prepend('User, ');
// str.insertAt('woop',5 );
// console.log(str.toString());
// str.remove(6, 3);
// console.log(str.toString());


expect = require('chai').expect;

describe("Test StringBuilder class", function () {
    describe('Test if class can be instantiated correctly.', function () {
        it('Test if StringBuilder is a class', function () {
            let isClass = (typeof StringBuilder) === 'function';
            expect(isClass).to.be.equal(true);
        });

        // it("Test empty argument", function () {
        //     let str = new StringBuilder();
        //     expect(str.toString()).to.be.equal('');
        // });

        it("Test empty argument", function () {
            expect(() => new StringBuilder()).to.not.throw();
        });

        // it("Test with string argument", function () {
        //     let str = new StringBuilder('Pesho');
        //     expect(str.toString()).to.be.equal('Pesho');
        // });

        it("Test correct argument", function () {
            expect(() => new StringBuilder('test')).to.not.throw();
        });

        it("Test with non string argument", function () {
            expect(() => new StringBuilder(6)).to.throw(TypeError, "Argument must be string");
        });

        it("Test if object has own property Array", function () {
            let str = new StringBuilder();
            let hasOwnProperty = str.hasOwnProperty('_stringArray');
            expect(hasOwnProperty).to.be.equal(true);
        });

        it('has functions attached to prototype', function () {
            let str = new StringBuilder();
            expect(Object.getPrototypeOf(str).hasOwnProperty('append')).to.be.equal(true, "Missing append function");
            expect(Object.getPrototypeOf(str).hasOwnProperty('prepend')).to.be.equal(true, "Missing prepend function");
            expect(Object.getPrototypeOf(str).hasOwnProperty('insertAt')).to.be.equal(true, "Missing insertAt function");
            expect(Object.getPrototypeOf(str).hasOwnProperty('remove')).to.be.equal(true, "Missing remove function");
            expect(Object.getPrototypeOf(str).hasOwnProperty('toString')).to.be.equal(true, "Missing toString function");
        });

        it('must initialize data to an empty array', function () {
            let str = new StringBuilder();
            expect(str._stringArray instanceof Array).to.be.equal(true, 'Data must be of type array');
            expect(str._stringArray.length).to.be.equal(0, 'Data array must be initialized empty');
        });
    });


    describe('Test StringBuilder functionality.', function () {
        it("Test append method", function () {
            let str = new StringBuilder('Pesho');
            str.append('&Gosho');
            expect(str.toString()).to.be.equal('Pesho&Gosho');
        });

        it("Test prepend method", function () {
            let str = new StringBuilder('&Pesho');
            str.prepend('Gosho');
            expect(str.toString()).to.be.equal('Gosho&Pesho');
        });

        it("Test insertAt method", function () {
            let str = new StringBuilder('PeshoGosho');
            str.insertAt(' & ', 5);
            expect(str.toString()).to.be.equal('Pesho & Gosho');
        });

        it('Test insertAt method size', function () {
            let str = new StringBuilder('hello');
            let strToInsert = 'kek';
            str.insertAt(strToInsert, 3);
            expect(str._stringArray.length === str.toString().length).to.be.equal(true);
        });

        it("Test remove method", function () {
            let str = new StringBuilder('Pesho&Gosho');
            str.remove(5, 6);
            expect(str.toString()).to.be.equal('Pesho');
        });

        it("Test toString method", function () {
            let str = new StringBuilder('Pesho&Gosho');
            expect(str.toString()).to.be.equal('Pesho&Gosho');
        });
    });

    describe('Test StringBuilder functionality with wrong argument.', function () {
        it("Test append method", function () {
            let str = new StringBuilder('Pesho');
            expect(() => str.append([])).to.throw(TypeError, "Argument must be string");
        });

        it("Test prepend method", function () {
            let str = new StringBuilder('&Pesho');
            expect(() => str.prepend([])).to.throw(TypeError, "Argument must be string");
        });

        it("Test insertAt method", function () {
            let str = new StringBuilder('PeshoGosho');
            expect(() => str.insertAt([], 5)).to.throw(TypeError, "Argument must be string");
        });
    });
});