function aggregateElements(elements) {
    function aggregate(arr, initialValue, func) {
        let result = initialValue;

        for (let i = 0; i < arr.length; i++) {
            result = func(result, arr[i]);
        }

        return result;
    }

    // let sum = (a, b) => (a + b);
    // let sumReciprocal = (a, b) => (a + 1 / b);
    // let concat = (a, b) => (a + b);
    //
    // console.log(aggregate(elements, 0, sum));
    // console.log(aggregate(elements, 0, sumReciprocal));
    // console.log(aggregate(elements, "", concat));

    console.log(aggregate(elements, 0, (a, b) => a + b));
    console.log(aggregate(elements, 0, (a, b) => a + 1 / b));
    console.log(aggregate(elements, "", (a, b) => a + b));
}


aggregateElements([1, 2, 3]);
aggregateElements([2, 4, 8, 16]);