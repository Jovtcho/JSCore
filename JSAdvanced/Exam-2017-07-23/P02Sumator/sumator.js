class Sumator {
    constructor() {
        this.data = [];
    }

    add(item) {
        this.data.push(item);
    }

    sumNums() {
        let sum = 0;
        for (let item of this.data)
            if (typeof (item) === 'number')
                sum += item;
        return sum;
    }

    removeByFilter(filterFunc) {
        this.data = this.data.filter(x => !filterFunc(x));
    }

    toString() {
        if (this.data.length > 0)
            return this.data.join(", ");
        else
            return '(empty)';
    }
}

// let list = new Sumator();
// console.log(`list = [${list}]`);
// list.add(1);
// list.add(2);
// list.add("three");
// list.add(4);
// console.log(`list = [${list}]`);
// console.log("sum = " + list.sumNums());
// list.add("5.5"); // not a number!
// list.add(7.7);
// console.log(`list = [${list}]`);
// console.log("sum = " + list.sumNums());
// list.removeByFilter(x => x % 2 === 0);
// console.log(`list = [${list}]`);
// console.log("sum = " + list.sumNums());


let expect = require('chai').expect;

describe('Test sumator functionality', function () {
    describe('Test whether class correctly defined', function () {
        let sumator;

        beforeEach(function () {
            sumator = new Sumator();
        });

        it('Has Sumator own property "data"', function () {
            //let sumator = new Sumator();
            let hasOwnProperty = sumator.hasOwnProperty('data');
            expect(hasOwnProperty).to.be.equal(true, 'There is no data property');
        });

        it('Is function add() attached to class prototype', function () {
            //let sumator = new Sumator();
            //let hasOwnProperty = Object.getPrototypeOf(sumator).hasOwnProperty('add');
            let hasOwnProperty = Sumator.prototype.hasOwnProperty('add');
            expect(hasOwnProperty).to.be.equal(true, 'There is no add() function');
        });

        it('Is function sumNums() attached to class prototype', function () {
            //let sumator = new Sumator();
            let hasOwnProperty = Object.getPrototypeOf(sumator).hasOwnProperty('sumNums');
            expect(hasOwnProperty).to.be.equal(true, 'There is no sumNums() function');
        });

        it('Is function removeByFilter() attached to class prototype', function () {
            //let sumator = new Sumator();
            let hasOwnProperty = Object.getPrototypeOf(sumator).hasOwnProperty('removeByFilter');
            expect(hasOwnProperty).to.be.equal(true, 'There is no removeByFilter() function');
        });

        it('Is function toString() attached to class prototype', function () {
            //let sumator = new Sumator();
            let hasOwnProperty = Object.getPrototypeOf(sumator).hasOwnProperty('toString');
            expect(hasOwnProperty).to.be.equal(true, 'There is no toString() function');
        });

        it('Is initialize data an array', function () {
            //let sumator = new Sumator();
            expect(sumator.data instanceof Array).to.be.equal(true, 'Data must be of type array');
        });

        it('Test if initialize data to an empty array', function () {
            //let sumator = new Sumator();
            expect(sumator.data.length).to.be.equal(0, 'Data array must be initialized empty');
        });
    });

    describe('Test class Sumator functionality', function () {
        it('Test toString() with empty data', function () {
            let sumator = new Sumator();
            let emptyData = '(empty)';
            expect(sumator.toString()).to.be.equal(emptyData, 'toString does not work with empty data')
        });

        it('Test add() number item', function () {
            let sumator = new Sumator();
            sumator.add(1);
            sumator.add(11);
            expect(sumator.data.length).to.be.equal(2, 'Item is not added correctly')
        });

        it('Test add() number and string items', function () {
            let sumator = new Sumator();
            sumator.add(1);
            sumator.add('two');
            sumator.add(11);
            let testStr = '1, two, 11';
            expect(sumator.toString()).to.be.equal(testStr, 'Item is not added correctly')
        });

        it('Test sum numbers', function () {
            let sumator = new Sumator();
            sumator.add(1);
            sumator.add(11);
            let sum = 12;
            expect(sumator.sumNums()).to.be.equal(sum, 'Items are not summed correctly')
        });

        it('Test sum without numbers', function () {
            let sumator = new Sumator();
            sumator.add('twelve');
            sumator.add('two');
            sumator.add([4]);
            let sum = 0;
            expect(sumator.sumNums()).to.be.equal(sum, 'Item are not summed correctly')
        });

        it('Test removeByFilter() without numbers', function () {
            let sumator = new Sumator();
            sumator.add(12);
            sumator.add(2);
            sumator.add('twelve');
            sumator.add('1');
            sumator.add(7);
            sumator.add('three');
            sumator.add(4);
            sumator.add(5.5);
            let testStr = 'twelve, 1, 7, three, 5.5';
            let filterFunc = x => x % 2 === 0;
            sumator.removeByFilter(filterFunc);
            expect(sumator.toString()).to.be.equal(testStr, 'Items are not filtered correctly');
        });
    });
});