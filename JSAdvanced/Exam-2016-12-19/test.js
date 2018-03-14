function solve(score) {
    let scores = [];
    console.log(score);
    if (!isNaN(score) && score !== null) {
        // console.log(typeof score);
        // console.log(+score);

        scores.push(+score);//convert string representation of a number to number

    }

    return scores.length !== 0 ? scores[0] + 10 : 'empty';
}

console.log(solve());

// console.log(solve(10));
// console.log(solve(45));
// console.log(solve('pesho'));
// console.log(solve({}));
// console.log(solve([45, 5]));
// console.log(solve('100'));
// console.log(solve('22'));