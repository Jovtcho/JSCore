let list = (function () {
    let data = [];
    return {
        add: function (item) {
            data.push(item);
        },
        delete: function (index) {
            if (Number.isInteger(index) && index >= 0 && index < data.length) {
                return data.splice(index, 1)[0];
            } else {
                return undefined;
            }
        },
        toString: function () {
            return data.join(", ");
        }
    };
})();

expect = require('chai').expect;

//  Ako se testwa kato EEFE wseki test se prawi sam za sebe si, za da
//  moge winagi da se pochwa s przen masiw. Simulira se beforeEach

describe("list", function () {
    describe("add", function () {
        it("TestAdd1", function () {
            list.add(5);
            list.add(15);
            expect(list.toString()).to.be.equal('5, 15');
        });
        it("TestAdd2", function () {
            list.add(5);
            expect(list.toString()).to.be.equal('5');
        });
        it("TestAdd3", function () {
            list.add('asd');
            expect(list.toString()).to.be.equal('asd');
        });
    });
    describe("delete", function () {
        it("TestDelete1", function () {
            expect(list.delete(-1)).to.be.undefined;
        });
        it("TestDelete2", function () {
            expect(list.delete(-45)).to.be.undefined;
        });
        it("TestDelete3", function () {
            expect(list.delete('jibry')).to.be.undefined;
        });
        it("TestDelete4", function () {
            list.add(5);
            list.add(124);
            list.add('asdasfas');
            list.delete(2);
            expect(list.toString()).to.be.equal(`5, 124`);
        });
        it("TestDelete4", function () {
            list.add(5);
            list.add(124);
            list.add('asdasfas');
            list.delete(0);
            expect(list.toString()).to.be.equal(`124, asdasfas`);
        });
    });
    describe("toString", function () {
        it("TestString1", function () {
            list.add(5);
            list.add(124);
            list.add('asdasfas');
            expect(list.toString()).to.be.equal(`5, 124, asdasfas`);
        });
        it("TestString1", function () {
            list.add(5);
            list.delete(0);
            expect(list.toString()).to.be.equal(``);
        });
    });
});



// describe('List Tests', function () {
//     let list;                                //  ponege funkciqta e EEFE se maha EEFE-to i se testwa kato
//     beforeEach(function () {                 //  normalna funkciq i w describe se prawi beforeEach funkcia,
//         list = listCreator();                //  no kato se kachwa w Judge beforeEach funkciqta triabwa
//     });                                      //  da se mahne, zaradi EEFE-to.
//
//     it('Test empty list', function () {
//         expect(list.toString()).to.equal('', 'List was not empty!')
//     });
//
//
//     describe('Add Tests', function () {
//         it('Add one item (should add item)', function () {
//             list.add(4);
//             expect(list.toString()).to.equal('4', 'List did not add item!');
//         });
//         it('Add 3 items (should add items)', function () {
//             list.add('pesho');
//             list.add('pesho');
//             list.add('pesho');
//             expect(list.toString()).to.equal('pesho, pesho, pesho', 'List did not add items!');
//         });
//     });
//
//     describe('Delete', function () {
//         it('with floating-point should return undefined', function () {
//             let result = list.delete(3.12);
//             expect(result).to.be.undefined;
//         });
//         it('with empty list should return undefined', function () {
//             expect(list.delete(0)).to.be.undefined;
//         });
//         it('with index as much as list length should return undefined', function () {
//             list.add(3);
//             list.add(4);
//             expect(list.delete(2)).to.be.undefined;
//         });
//         it('with negative index should return undefined', function () {
//             list.add(3);
//             list.add(4);
//             expect(list.delete(-2)).to.be.undefined;
//         });
//
//         describe('Correct delete', function () {
//             it('with index 0 should return correct item', function () {
//                 list.add(5);
//                 list.add(6);
//                 list.add(7);
//                 expect(list.delete(0)).to.be.equal(5, 'List delete did not return correct value');
//             });
//             it('with index 0 should delete from list', function () {
//                 list.add(5);
//                 list.add(6);
//                 list.add(7);
//                 list.delete(0);
//                 expect(list.toString()).to.be.equal('6, 7', 'List is not empty!');
//             });
//         });
//     });
// });