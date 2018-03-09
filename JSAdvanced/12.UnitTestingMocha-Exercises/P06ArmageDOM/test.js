let expect = require('chai').expect;
let jsdom = require('jsdom-global')();
let $ = require('jquery');
let nuke = function nuke(selector1, selector2) {
    if (selector1 === selector2) return;
    $(selector1).filter(selector2).remove();
};

describe('Test ArmageDOM', function () {
    let originalHtml;
    beforeEach(function () {
        document.body.innerHTML = `
            <div id="target">
                <div class="nested target">
                    <p>This is some text</p>
                </div>
                <div class="target">
                    <p>Empty div</p>
                </div>
                <div class="inside">
                    <span class="nested">Some more text</span>
                    <span class="target">Some more text</span>
                </div>
            </div>`;
        originalHtml = $('#target').html();
    });

    describe('Test with invalid selectors', function () {
        it('Invalid first selector', function () {
            let selector1 = $('.test');
            let selector2 = $('.nested');
            nuke(selector1, selector2);
            expect($('#target').html()).to.be.equal(originalHtml);
        });

        it('Invalid second selector', function () {
            let selector1 = $('.nested');
            let selector2 = $('.test');
            nuke(selector1, selector2);
            expect($('#target').html()).to.be.equal(originalHtml);
        });
    });

    describe('Test with only one selector', function () {
        it('Omitted second selector', function () {
            let selector1 = $('.nested');
            nuke(selector1);
            expect($('#target').html()).to.be.equal(originalHtml);
        });
    });

    describe('Test with equal selectors', function () {
        it('Equal selectors', function () {
            let selector1 = $('.nested');
            nuke(selector1, selector1);
            expect($('#target').html()).to.be.equal(originalHtml);
        });
    });

    describe('Test with non equal selectors on valid different elements', function () {
        it('Non equal selectors', function () {
            let selector1 = $('.nested');
            let selector2 = $('.inside');
            nuke(selector1, selector2);
            expect($('#target').html()).to.be.equal(originalHtml);
        });
    });

    describe('Test with non equal selectors on valid element', function () {
        it('Non equal selectors', function () {
            let selector1 = $('.nested');
            let selector2 = $('.target');
            nuke(selector1, selector2);
            expect($('#target').html()).not.be.equal(originalHtml);
        });
    });
});