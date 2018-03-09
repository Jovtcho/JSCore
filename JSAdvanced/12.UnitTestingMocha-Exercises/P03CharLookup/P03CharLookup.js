function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

let expect = require('chai').expect;

describe('Lookup character tests', function () {
    it('Test if first argument is a string', function () {
        expect(lookupChar(123, 1)).to.be.undefined;
    });

    it('Test if second argument is a number', function () {
        expect(lookupChar('stringovam', '4')).to.be.undefined;
    });

    it('Test if second argument is a float point number', function () {
        expect(lookupChar('stringovam', 3.4)).to.be.undefined;
    });

    it('Test if second argument is negative', function () {
        expect(lookupChar('stringovam', -1)).to.be.equal('Incorrect index');
    });

    it('Test if second argument is bigger than ot equal to string length', function () {
        expect(lookupChar('stringovam', 10)).to.be.equal('Incorrect index');
    });

    it('Should return char on index position from string', function () {
        expect(lookupChar('stringovam', 5)).to.be.equal('g');
    });
});