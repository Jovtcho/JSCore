let isOddOrEven = require('./P02EvenOdd').isOddOrEven;
let expect = require('chai').expect;

describe('Test even/odd string length', function () {
    it('Should return odd if string has odd length', function () {
        expect(isOddOrEven('pesho')).to.be.equal('odd');
    });

    it('Should return even if string has even length', function () {
        expect(isOddOrEven('roar')).to.be.equal('even');
    });

    it('Should return undefined if argument is not a string', function () {
        expect(isOddOrEven(12)).to.be.undefined;
    });
});