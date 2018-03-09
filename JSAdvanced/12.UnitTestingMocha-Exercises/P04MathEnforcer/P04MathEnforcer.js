let mathEnforcer = {
    addFive: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

let expect = require('chai').expect;

describe('MathEnforcer tests', function () {
    it('Check if add argument is a number', function () {
        expect(mathEnforcer.addFive('pesho')).to.be.undefined;
    });

    it('Check if subtract argument is a number', function () {
        expect(mathEnforcer.subtractTen('gosho')).to.be.undefined;
    });

    it('Check if sum first argument is a number', function () {
        expect(mathEnforcer.sum('pesho', 20)).to.be.undefined;
    });

    it('Check if sum second argument is a number', function () {
        expect(mathEnforcer.sum(10, 'gosho')).to.be.undefined;
    });

    it('Should return 15/addFive', function () {
        expect(mathEnforcer.addFive(10)).to.be.equal(15);
    });

    it('Should return -5/addFive', function () {
        expect(mathEnforcer.addFive(-10)).to.be.equal(-5);
    });

    it('Should return 5.02/addFive', function () {
        expect(mathEnforcer.addFive(0.02)).to.be.closeTo(5.02, 0.01);
    });

    it('Should return -9/subtractTen', function () {
        expect(mathEnforcer.subtractTen(1)).to.be.equal(-9);
    });

    it('Should return 510/subtractTen', function () {
        expect(mathEnforcer.subtractTen(-500)).to.be.equal(-510);
    });

    it('Should return 12.22/subtractTen', function () {
        expect(mathEnforcer.subtractTen(22.22)).to.be.closeTo(12.22, 0.01);
    });

    it('Should return 0/sum(0,0)', function () {
        expect(mathEnforcer.sum(0, 0)).to.be.equal(0);
    });

    it('Should return 0/sum(10,20)', function () {
        expect(mathEnforcer.sum(10, 20)).to.be.equal(30);
    });

    it('Should return 0/sum(-100,-20)', function () {
        expect(mathEnforcer.sum(-100, -20)).to.be.equal(-120);
    });

    it('Should return 0/sum(-5,33)', function () {
        expect(mathEnforcer.sum(-5, 33)).to.be.equal(28);
    });

    it('Should return 0/sum(10.01,20.02)', function () {
        expect(mathEnforcer.sum(10.01, 20.02)).to.be.closeTo(30.03, 0.01);
    });

    it('Should return 0/sum(-10.01,20.02)', function () {
        expect(mathEnforcer.sum(-10.01, 20.02)).to.be.closeTo(10.01, 0.01);
    });
});