function createList() {
    let data = [];
    return {
        add: function (item) {
            data.push(item)
        },
        shiftLeft: function () {
            if (data.length > 1) {
                let first = data.shift();
                data.push(first);
            }
        },
        shiftRight: function () {
            if (data.length > 1) {
                let last = data.pop();
                data.unshift(last);
            }
        },
        swap: function (index1, index2) {
            if (!Number.isInteger(index1) || index1 < 0 || index1 >= data.length ||
                !Number.isInteger(index2) || index2 < 0 || index2 >= data.length ||
                index1 === index2) {
                return false;
            }
            let temp = data[index1];
            data[index1] = data[index2];
            data[index2] = temp;
            return true;
        },
        toString: function () {
            return data.join(", ");
        }
    };
}

expect = require('chai').expect;

describe('Test operations over list', function () {
    let myList;

    beforeEach(function () {
        myList = createList();
    });

    describe('Test if list after initialization', function () {
        it('Test if list is empty after initialization', function () {
            expect(myList.toString()).to.be.equal('', 'List is not empty');
        });


    });

    describe('test add functionality', function () {
        it('Add one number item', function () {
            myList.add(4);
            expect(myList.toString()).to.be.equal('4', 'Add is not working');
        });

        it('Add one string item', function () {
            myList.add('Pisho');
            expect(myList.toString()).to.be.equal('Pisho', 'Add is not working');
        });

        it('Add different types of items', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add({name: 'Gosho'});
            expect(myList.toString()).to.be.equal('7, Pisho, [object Object]', 'Add is not working');
        });
    });

    describe('test shiftLeft functionality', function () {
        it('shiftLeft one item', function () {
            myList.add(4);
            myList.shiftLeft();
            expect(myList.toString()).to.be.equal('4', 'ShiftLeft is not working');
        });

        it('shiftLeft more items', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add({name: 'Gosho'});
            myList.shiftLeft();
            expect(myList.toString()).to.be.equal('Pisho, [object Object], 7', 'ShiftLeft is not working');
        });
    });

    describe('test shiftRight functionality', function () {
        it('shiftRight one item', function () {
            myList.add(8);
            myList.shiftRight();
            expect(myList.toString()).to.be.equal('8', 'shiftRight is not working');
        });

        it('shiftRight more items', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add({name: 'Gosho'});
            myList.shiftRight();
            expect(myList.toString()).to.be.equal('[object Object], 7, Pisho', 'ShiftRight is not working');
        });
    });

    describe('test swap functionality', function () {
        it('index1 is not an integer', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add(12);
            expect(myList.swap(3.14, 1)).to.be.equal(false, 'swap is not working');
            expect(myList.toString()).to.be.equal('7, Pisho, 12', 'swap is not working');
        });

        it('index2 is not an integer', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add(12);
            expect(myList.swap(1, 1.23)).to.be.equal(false, 'swap is not working');
            expect(myList.toString()).to.be.equal('7, Pisho, 12', 'swap is not working');
        });

        it('index1 is string', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add(12);
            expect(myList.swap('test', 1)).to.be.equal(false, 'swap is not working');
            expect(myList.toString()).to.be.equal('7, Pisho, 12', 'swap is not working');
        });

        it('index2 is string', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add(12);
            expect(myList.swap(1, 'test')).to.be.equal(false, 'swap is not working');
            expect(myList.toString()).to.be.equal('7, Pisho, 12', 'swap is not working');
        });

        it('index1 is negative', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add(12);
            expect(myList.swap(-1, 1)).to.be.equal(false, 'swap is not working');
            expect(myList.toString()).to.be.equal('7, Pisho, 12', 'swap is not working');
        });

        it('index2 is negative', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add(12);
            expect(myList.swap(1, -1)).to.be.equal(false, 'swap is not working');
            expect(myList.toString()).to.be.equal('7, Pisho, 12', 'swap is not working');
        });

        it('index1 is more then list length', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add(12);
            expect(myList.swap(12, 1)).to.be.equal(false, 'swap is not working');
            expect(myList.toString()).to.be.equal('7, Pisho, 12', 'swap is not working');
        });

        it('index2 is more then list length', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add(12);
            expect(myList.swap(1, 6)).to.be.equal(false, 'swap is not working');
            expect(myList.toString()).to.be.equal('7, Pisho, 12', 'swap is not working');
        });

        it('index1 is equlas list length', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add(12);
            expect(myList.swap(3, 0)).to.be.equal(false, 'swap is not working');
            expect(myList.toString()).to.be.equal('7, Pisho, 12', 'swap is not working');
        });

        it('index2 is equals list length', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add(12);
            expect(myList.swap(0, 3)).to.be.equal(false, 'swap is not working');
            expect(myList.toString()).to.be.equal('7, Pisho, 12', 'swap is not working');
        });

        it('index1 and index2 are equal', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add(12);
            expect(myList.swap(1, 1)).to.be.equal(false, 'swap is not working');
            expect(myList.toString()).to.be.equal('7, Pisho, 12', 'swap is not working');
        });

        it('swap with correct indices', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add(12);
            expect(myList.swap(0, 2)).to.be.equal(true, 'swap is not working');
            expect(myList.toString()).to.be.equal('12, Pisho, 7', 'swap is not working');
        });

        it('swap with correct indices', function () {
            myList.add(7);
            myList.add('Pisho');
            myList.add(12);
            expect(myList.swap(2, 0)).to.be.equal(true, 'swap is not working');
            expect(myList.toString()).to.be.equal('12, Pisho, 7', 'swap is not working');
        });
    });
});

