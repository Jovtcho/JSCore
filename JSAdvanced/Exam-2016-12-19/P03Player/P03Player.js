function solve() {
    class Player {
        constructor(nickName) {
            this.nickName = nickName;
            this.scores = [];
        }

        addScore(score) {
            if (!isNaN(score) && score !== null) {
                this.scores.push(Number(score));
                this.sortScores();
            }

            return this;
        }

        get scoreCount() {
            return this.scores.length;
        }

        get highestScore() {
            return this.scores[0];
        }

        get topFiveScore() {
            let count = Math.min(5, this.scores.length);
            return this.scores.slice(0, count);
        }

        toString() {
            return `${this.nickName}: [${this.scores}]`;
        }

        sortScores() {
            this.scores.sort((el1, el2) => el2 - el1);
        }
    }

    return {
        Player
    }
}

let Player = solve().Player;

let peter = new Player("Peter");
console.log('Highest score: ' + peter.highestScore);
console.log(`Top 5 score: [${peter.topFiveScore}]`);
console.log('' + peter);
console.log('Score count: ' + peter.scoreCount);
peter.addScore(450);
peter.addScore(200);
console.log('Highest score: ' + peter.highestScore);
console.log(`Top 5 score: [${peter.topFiveScore}]`);
console.log('' + peter);
peter.addScore(2000);
peter.addScore(300);
peter.addScore(50);
peter.addScore(700);
peter.addScore(700);
console.log('Highest score: ' + peter.highestScore);
console.log(`Top 5 score: [${peter.topFiveScore}]`);
console.log('' + peter);
console.log('Score count: ' + peter.scoreCount);
console.log();
let maria = new Player("Maria")
    .addScore(350)
    .addScore(779)
    .addScore(180);
console.log('Highest score: ' + maria.highestScore);
console.log(`Top 5 score: [${maria.topFiveScore}]`);
console.log('' + maria);



