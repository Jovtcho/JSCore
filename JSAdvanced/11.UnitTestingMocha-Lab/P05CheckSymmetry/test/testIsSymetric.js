let isSymmetric = require('../isSymmetric').isSymmetric;
let expect = require('chai').expect;

describe('Check symmetry', function () {
    describe('General tests', function () {
        it('Should be a function', function () {
            expect(typeof isSymmetric).to.be.equal('function');
        });
    });

    describe('Value tests', function () {
        it('Should return true', function () {
            expect(isSymmetric([1, 2, 3, 2, 1])).to.be.equal(true);
        });
    });

    describe('Value tests', function () {
        it('Should return true', function () {
            expect(isSymmetric([1])).to.be.equal(true);
        });
    });

    describe('Value tests', function () {
        it('Should return true', function () {
            expect(isSymmetric([1, -2, 3, -2, 1])).to.be.equal(true);
        });
    });

    describe('Value tests', function () {
        it('Should return true', function () {
            expect(isSymmetric([new Date(), 2, 3, 2, new Date()])).to.be.equal(true);
        });
    });

    describe('Value tests', function () {
        it('Should return true', function () {
            expect(isSymmetric([1, {name: 'Pesho'}, 3, {name: 'Pesho'}, 1])).to.be.equal(true);
        });
    });

    describe('Value tests', function () {
        it('Should return false', function () {
            expect(isSymmetric([3, {name: 'Pesho'}, 1])).to.be.equal(false);
        });
    });

    describe('Value tests', function () {
        it('Should return false', function () {
            expect(isSymmetric([{name: 'Pesho'}, 1, 3, {name: 'Pesho'}, 1])).to.be.equal(false);
        });
    });

    describe('Value tests', function () {
        it('Should return false', function () {
            expect(isSymmetric({})).to.be.equal(false);
        });
    });

    describe('Value tests', function () {
        it('Should return false', function () {
            expect(isSymmetric('Test')).to.be.equal(false);
        });
    });
});