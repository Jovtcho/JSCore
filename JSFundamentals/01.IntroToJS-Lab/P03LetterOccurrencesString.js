/**
 * Created by Jo on 1/9/2018.
 */

function countLettersInString(string, letter) {
    //let stringToArr = [...string];
    let counter = 0;

    // for (let ch of stringToArr) {
    //     if (ch === letter) {
    //         counter++;
    //     }
    // }

    for (let i = 0; i < string.length; i++) {
        if (string[i] === letter) {
            counter++;
        }
    }

    return (counter);
}

console.log(countLettersInString('hello', 'l'));
console.log(countLettersInString('panther', 'n'));
