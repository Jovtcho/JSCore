function printDeckOfCards(paramsArr) {
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

    let deckOfCards = [];
    for (let arg of paramsArr) {
        let face = arg.substring(0, arg.length - 1);
        let suit = arg.substr(arg.length - 1, 1);
        try {
            let card = makeCard(face, suit);
            deckOfCards.push(card);
        }
        catch (ex) {
            console.log(`Invalid card: ${arg}`);
            return;
        }
    }

    console.log(deckOfCards.join(' '));
}

printDeckOfCards(['AS', '10D', 'KH', '2C']);
printDeckOfCards(['AS', '10D', 'KH', '2C']);
printDeckOfCards(['5S', '3D', 'QD', '1C']);
