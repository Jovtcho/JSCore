let makeList = require('./P02AddLeftRightClear');
let expect = require('chai').expect;

//let obj = makeList();
describe('Test makeList', function () {
    let myList;

    beforeEach(function () {
        myList = makeList();
    });

    describe('Test object returned by makeList function', function () {
        it('Is myList an object', function () {
            let isObject = (typeof myList === 'object');
            expect(isObject).to.be.equal(true, 'myList is not an object');
        });

        it('Has own property addLeft', function () {
            let hasOwnProperty = myList.hasOwnProperty('addLeft');
            expect(hasOwnProperty).to.be.equal(true, 'Function addLeft is missing');
        });

        it('Has own property addRight', function () {
            let hasOwnProperty = myList.hasOwnProperty('addRight');
            expect(hasOwnProperty).to.be.equal(true, 'Function addRight is missing');
        });

        it('Has own property clear', function () {
            let hasOwnProperty = myList.hasOwnProperty('clear');
            expect(hasOwnProperty).to.be.equal(true, 'Function clear is missing');
        });

        it('Has own property toString', function () {
            let hasOwnProperty = myList.hasOwnProperty('toString');
            expect(hasOwnProperty).to.be.equal(true, 'Function toString is missing');
        });

        it('Is property addLeft a function', function () {
            let isFunction = (typeof myList.addLeft === 'function');
            expect(isFunction).to.be.equal(true, 'addLeft is not a function');
        });

        it('Is property addRight a function', function () {
            let isFunction = (typeof myList.addRight === 'function');
            expect(isFunction).to.be.equal(true, 'addRight is not a function');
        });

        it('Is property clear a function', function () {
            let isFunction = (typeof myList.clear === 'function');
            expect(isFunction).to.be.equal(true, 'clear is not a function');
        });

        it('Is property toString a function', function () {
            let isFunction = (typeof myList.toString === 'function');
            expect(isFunction).to.be.equal(true, 'toString is not a function');
        });
    });

    describe('Test myList functionality', function () {
        it('Is data empty after myList creation', function () {
            expect(myList.toString() === '').to.be.equal(true, 'myList is not empty');
        });

        it('addRight number, string, object', function () {
            myList.addRight(3);
            myList.addRight({});
            myList.addRight('two');
            expect(myList.toString()).to.be.equal('3, [object Object], two', 'addRight is not working');
        });

        it('addLeft number, string, object', function () {
            myList.addLeft(3);
            myList.addLeft({});
            myList.addLeft('two');
            expect(myList.toString()).to.be.equal('two, [object Object], 3', 'addLeft is not working');
        });

        it('addLeft number, string, object', function () {
            myList.addLeft(3);
            myList.addLeft({});
            myList.addLeft('two');
            myList.clear();
            expect(myList.toString()).to.be.equal('', 'clear is not working');
        });
    });
});