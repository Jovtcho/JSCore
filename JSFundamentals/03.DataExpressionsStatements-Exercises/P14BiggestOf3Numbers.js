// function findGreaterFrom3Numbers(paramsArr) {
//     let num1 = paramsArr[0];
//     let num2 = paramsArr[1];
//     let num3 = paramsArr[2];
//
//     return Math.max(num1, num2, num3);
//
//     //return ([num1, num2, num3]) => Math.max(paramsArr[0], paramsArr[1], paramsArr[2]);
// }
//
// console.log(findGreaterFrom3Numbers([5, -2, 7]));
// console.log(findGreaterFrom3Numbers([130, 5, 99]));
// console.log(findGreaterFrom3Numbers([43, 43.2, 43.1]));
// console.log(findGreaterFrom3Numbers([5, 5, 5]));
// console.log(findGreaterFrom3Numbers([-10, -20, -30]));


let func = paramsArr => Math.max(paramsArr[0], paramsArr[1], paramsArr[2]);

console.log(func([3, 4, 8]));