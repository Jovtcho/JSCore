let expect = require('chai').expect;
let jsdom = require('jsdom-global')();
let $ = require('jquery');

document.body.innerHTML = `<div id="wrapper">
    <input type="text" id="name">
    <input type="text" id="income">
</div>`;

let sharedObject = {
    name: null,
    income: null,
    changeName: function (name) {
        if (name.length === 0) {
            return;
        }
        this.name = name;
        let newName = $('#name');
        newName.val(this.name);
    },
    changeIncome: function (income) {
        if (!Number.isInteger(income) || income <= 0) {
            return;
        }
        this.income = income;
        let newIncome = $('#income');
        newIncome.val(this.income);
    },
    updateName: function () {
        let newName = $('#name').val();
        if (newName.length === 0) {
            return;
        }
        this.name = newName;
    },
    updateIncome: function () {
        let newIncome = $('#income').val();
        if (isNaN(newIncome) || !Number.isInteger(Number(newIncome)) || Number(newIncome) <= 0) {
            return;
        }
        this.income = Number(newIncome);
    }
};


describe('Test shared object', function () {
    describe('Initial tests', function () {
        it('Test is initial name null', function () {
            expect(sharedObject.name).to.be.null;
        });

        it('Test is initial income null', function () {
            expect(sharedObject.income).to.be.null;
        });
    });

    describe('Test change name', function () {
        it('Test with input with 0 length', function () {
            sharedObject.changeName('');
            expect(sharedObject.name).to.be.null;
        });

        it('Test with empty string and preexisting value', function () {
            sharedObject.name = 'Misho';
            sharedObject.changeName('');
            expect(sharedObject.name).to.be.equal('Misho');
        });

        it('Test with input with non 0 length', function () {
            sharedObject.changeName('Pesho');
            expect(sharedObject.name).to.be.equal('Pesho', 'changeName is not working');
        });

        describe('Test DOM element name', function () {
            it('Test with input with 0 length', function () {
                let domName = $('#name');
                sharedObject.changeName('');
                expect(domName.val()).to.be.equal('Pesho');
            });

            it('Test with input with non 0 length', function () {
                let domName = $('#name');
                sharedObject.changeName('Gosho');
                expect(domName.val()).to.be.equal('Gosho');
            });
        });
    });

    describe('Test change income', function () {
        it('Test with input string', function () {
            sharedObject.changeIncome('test');
            expect(sharedObject.income).to.be.null;
        });

        it('Test with float point number', function () {
            sharedObject.changeIncome(3.14);
            expect(sharedObject.income).to.be.null;
        });

        it('Test with negative number', function () {
            sharedObject.changeIncome(-10);
            expect(sharedObject.income).to.be.null;
        });

        it('Test with 0', function () {
            sharedObject.changeIncome(0);
            expect(sharedObject.income).to.be.null;
        });

        it('Test with positive integer number', function () {
            sharedObject.changeIncome(1);
            expect(sharedObject.income).to.be.equal(1);
        });

        it('Test with positive integer number', function () {
            sharedObject.income = 10;
            sharedObject.changeIncome(5);
            expect(sharedObject.income).to.be.equal(5);
        });

        describe('Test DOM element income', function () {
            it('Test with input string', function () {
                sharedObject.changeIncome(10);
                let domIncome = $('#income');
                sharedObject.changeIncome('Test');
                expect(domIncome.val()).to.be.equal('10');
            });

            it('Test with float point number', function () {
                sharedObject.changeIncome(6);
                let domIncome = $('#income');
                sharedObject.changeIncome(3.14);
                expect(domIncome.val()).to.be.equal('6');
            });

            it('Test with negative number', function () {
                sharedObject.changeIncome(3);
                let domIncome = $('#income');
                sharedObject.changeIncome(-1);
                expect(domIncome.val()).to.be.equal('3');
            });

            it('Test with 0', function () {
                sharedObject.changeIncome(4);
                let domIncome = $('#income');
                sharedObject.changeIncome(0);
                expect(domIncome.val()).to.be.equal('4');
            });

            it('Test with positive ineteger', function () {
                sharedObject.changeIncome(4);
                let domIncome = $('#income');
                sharedObject.changeIncome(340);
                expect(domIncome.val()).to.be.equal('340');
            });
        });
    });

    describe('Test update name', function () {
        it('Test with 0 length dom element', function () {
            sharedObject.changeName('Pesho');
            let domName = $('#name');
            domName.val('');
            sharedObject.updateName();
            expect(sharedObject.name).to.be.equal('Pesho');
        });

        it('Test with non 0 length dom element', function () {
            sharedObject.changeName('Pesho');
            let domName = $('#name');
            domName.val('Gosho');
            sharedObject.updateName();
            expect(sharedObject.name).to.be.equal('Gosho');
        });
    });

    describe('Test update income', function () {
        it('Test with string dom element', function () {
            sharedObject.changeIncome(10);
            let domName = $('#income');
            domName.val('Cyk');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(10);
        });

        it('Test with float point number dom element', function () {
            sharedObject.changeIncome(12);
            let domName = $('#income');
            domName.val(3.14);
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(12);
        });

        it('Test with negative number dom element', function () {
            sharedObject.changeIncome(132);
            let domName = $('#income');
            domName.val(-1);
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(132);
        });

        it('Test with 0 dom element', function () {
            sharedObject.changeIncome(162);
            let domName = $('#income');
            domName.val(0);
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(162);
        });

        it('Test with positive integer number dom element', function () {
            sharedObject.changeIncome(7);
            let domName = $('#income');
            domName.val(90);
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(90);
        });
    });
});