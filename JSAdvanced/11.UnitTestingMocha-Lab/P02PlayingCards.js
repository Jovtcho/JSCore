function makeCard(face, suit) {
    let cardFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let cardSuits = ['S', 'H', 'D', 'C'];

    if (!cardFaces.includes(face)) {
        throw new Error('Invalid face');
    }

    if (!cardSuits.includes(suit)) {
        throw new Error('Invalid suit');
    }

    return {
        face: face,
        suit: suit,
        toString: function () {
            let cardPictures = {
                'S': '\u2660',
                'H': '\u2665',
                'D': '\u2666',
                'C': '\u2663'
            };
            return `${face}${cardPictures[suit]}`;
        }
    };
}

console.log('' + makeCard('A', 'S'));
console.log('' + makeCard('10', 'H'));
console.log('' + makeCard('10', 'Z'));
console.log('' + makeCard('1', 'C'));
