function solution(command) {
    switch (command) {
        case 'upvote':
            this.upvotes++;
            break;
        case 'downvote':
            this.downvotes++;
            break;
        case 'score':
            let shownUpvotes = this.upvotes;
            let shownDownvotes = this.downvotes;

            let score = shownUpvotes - shownDownvotes;
            let rating = 'new';
            if (shownUpvotes + shownDownvotes >= 10) {
                let majorityPercent = shownUpvotes * 100 / (shownUpvotes + shownDownvotes);
                if (majorityPercent > 66) {
                    rating = "hot";
                } else if (score < 0) {
                    rating = 'unpopular';
                } else if (shownUpvotes > 100 || shownDownvotes > 100) {
                    rating = 'controversial';
                }
            }

            if (shownUpvotes + shownDownvotes > 50) {
                let obfuscatedIndex = Math.ceil(Math.max(shownUpvotes, shownDownvotes) * 25 / 100);
                shownUpvotes += obfuscatedIndex;
                shownDownvotes += obfuscatedIndex;
            }
            score = shownUpvotes - shownDownvotes;

            return [shownUpvotes, shownDownvotes, score, rating];
    }
}

let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};

solution.call(post, 'upvote');
solution.call(post, 'downvote');
let score = solution.call(post, 'score');// [127, 127, 0, 'controversial']
console.log(score);
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
solution.call(post, 'downvote'); //…        // (executed 50 times)
score = solution.call(post, 'score');
console.log(score);


// let post = {
//     id: '3',
//     author: 'emil',
//     content: 'wazaaaaa',
//     upvotes: 100,
//     downvotes: 100
// };
//
// function solution(command) {
//     let commands = {
//         upvote: upvotes,
//         downvote: downvotes,
//         score: report
//     };
//
//     commands[command]();
//
//     function upvotes() {
//         post.upvotes++;
//     }
//
//     function downvotes() {
//         post.downvotes++;
//     }
//
//     function report() {
//         console.log(post);
//     }
// }
//
//
// solution.call(post, 'upvote');
// solution.call(post, 'downvote');
// let score = solution.call(post, 'score'); // [127, 127, 0, 'controversial']
// solution.call(post, 'downvote'); //…        // (executed 50 times)
// solution.call(post, 'downvote'); //…        // (executed 50 times)
// solution.call(post, 'downvote'); //…        // (executed 50 times)
// solution.call(post, 'downvote'); //…        // (executed 50 times)
// solution.call(post, 'downvote'); //…        // (executed 50 times)
// solution.call(post, 'downvote'); //…        // (executed 50 times)
// solution.call(post, 'downvote'); //…        // (executed 50 times)
// solution.call(post, 'downvote'); //…        // (executed 50 times)
// solution.call(post, 'downvote'); //…        // (executed 50 times)
// solution.call(post, 'downvote'); //…        // (executed 50 times)
// score = solution.call(post, 'score');
//
//
