let sum = require('../sum').sum;
let expect = require('chai').expect;

describe('Check sum function', function () {
    it('Should return 10', function () {
        expect(sum([2, 3, 1, -4, 6, 1, -2, 3])).to.be.equal(10);
    });

    it('Should return 0 for empty array', function () {
        expect(sum([])).to.be.equal(0);
    });

    it('Should return NaN', function () {
        expect(sum('Test')).to.be.NaN;
    })
});