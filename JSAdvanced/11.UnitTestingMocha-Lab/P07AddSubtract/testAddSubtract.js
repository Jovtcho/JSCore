let createCalculator = require('./P07AddSubtract').createCalculator;
let expect = require('chai').expect;

describe('Test add/subtract calculator', function () {
    let calc;
    beforeEach(function () {
        calc = createCalculator();
    });

    describe('General tests', function () {
        it('Should return an object calculator', function () {
            expect(typeof calc).to.be.equal('object');
        });

        it('Should return add function', function () {
            expect(typeof calc.add).to.be.equal('function');
        });

        it('Should return add function', function () {
            expect(typeof calc.subtract).to.be.equal('function');
        });

        it('Should return add function', function () {
            expect(typeof calc.get).to.be.equal('function');
        });
    });

    describe('Value tests', function () {
        it('Should return 0 after initialization', function () {
            expect(calc.get()).to.be.equal(0);
        });

        it('Should return 17 after add 5 and 12', function () {
            calc.add(5);
            calc.add(12);
            let value = calc.get();
            expect(value).to.be.equal(17);
        });

        it('Should return 30 after subtract 12 and -42', function () {
            calc.subtract(12);
            calc.subtract(-42);
            let value = calc.get();
            expect(value).to.be.equal(30);
        });

        it('Should return 5 after add 5 as a string', function () {
            calc.add('5');
            expect(calc.get()).to.be.equal(5);
        });

        it('Should return 42 after subtract -42 as a string', function () {
            calc.subtract('-42');
            expect(calc.get()).to.be.equal(42);
        });

        it('Should return 0 after initialization', function () {
            calc.add(3.14);
            calc.subtract(1.13);
            expect(calc.get()).to.be.closeTo(2.01, 0.001);
        });

        it('Should return 0 after initialization', function () {
            calc.add('0.12');
            calc.subtract(0.1);
            expect(calc.get()).to.be.closeTo(0.02, 0.001);
        });
    });
});