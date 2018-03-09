let rgbToHexColor = require('../P06RGBtoHex').rgbToHexColor;
let expect = require('chai').expect;

describe('Test rgbToHexColor conversion function', function () {
    describe('General tests', function () {
        it('Should be a function', function () {
            expect(typeof rgbToHexColor).to.be.equal('function');
        });
    });

    describe('Value tests', function () {
        it('Should return undefined. Input is empty', function () {
            expect(rgbToHexColor()).to.be.undefined;
        });

        it('Should return undefined. Input is incorrect', function () {
            expect(rgbToHexColor('test', {}, [4])).to.be.undefined;
        });

        it('Should return undefined. Red is not integer', function () {
            expect(rgbToHexColor(10.6, 10, 200)).to.be.undefined;
        });

        it('Should return undefined. Green is not integer', function () {
            expect(rgbToHexColor(10, 23.6, 200)).to.be.undefined;
        });

        it('Should return undefined. Blue is not integer', function () {
            expect(rgbToHexColor(10, 10, 203.89)).to.be.undefined;
        });

        it('Should return undefined. Red is over the range', function () {
            expect(rgbToHexColor(256, 10, 200)).to.be.undefined;
        });

        it('Should return undefined. Green is over the range', function () {
            expect(rgbToHexColor(17, 256, 200)).to.be.undefined;
        });

        it('Should return undefined. Blue is over the range', function () {
            expect(rgbToHexColor(106, 100, 256)).to.be.undefined;
        });

        it('Should return undefined. Red is below the range', function () {
            expect(rgbToHexColor(-1, 10, 200)).to.be.undefined;
        });

        it('Should return undefined. Green is below the range', function () {
            expect(rgbToHexColor(90, -1, 200)).to.be.undefined;
        });

        it('Should return undefined. Blue is below the range', function () {
            expect(rgbToHexColor(0, 100, -1)).to.be.undefined;
        });

        it('Should return string value', function () {
            expect(typeof rgbToHexColor(0, 100, 10)).to.be.equal('string');
        });

        it('Should return hex value #050505', function () {
            expect(rgbToHexColor(5, 5, 5)).to.be.equal('#050505');
        });

        it('Should return hex value #FF0505', function () {
            expect(rgbToHexColor(255, 5, 5)).to.be.equal('#FF0505');
        });

        it('Should return hex value #FFFFFF', function () {
            expect(rgbToHexColor(255, 255, 255)).to.be.equal('#FFFFFF');
        });
    });
});