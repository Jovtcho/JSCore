function getModel() {
    let num1, num2, result;

    function init(num1Select, num2Select, resultSelect) {
        num1 = $(num1Select);
        num2 = $(num2Select);
        result = $(resultSelect);
    }

    function add() {
        result.val(Number(num1.val()) + Number(num2.val()));
    }

    function subtract() {
        result.val(Number(num1.val()) - Number(num2.val()));
    }

    return {
        init: init,
        add: add,
        subtract: subtract
    }
}