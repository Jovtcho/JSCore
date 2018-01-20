/**
 * Created by Jo on 1/8/2018.
 */

function calculateVat(numsArr) {
    let sum = 0;
    //let sum1 = 0;

    for (let index = 0; index < numsArr.length; index++) {
        sum += numsArr[index];
    }

    // for (let num of numsArr) {
    //     sum1 += num;
    // }

    let vat = sum * 20 / 100;
    let total = sum + vat;

    console.log("sum = " + sum);
    //console.log("sum1 = " + sum1);
    console.log("VAT = " + vat);
    console.log("sum = " + total);
}

calculateVat([1.20, 2.60, 3.50]);
calculateVat([1, 2, 3]);
