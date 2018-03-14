function cardDeckBuilder(selector) {
    function addCard(face, suit) {
        let card = makeCard(face, suit);
        let container = $(selector);
        let cardDiv = $(`<div class="card">${card.toString()}</div>`);
        cardDiv.on('click', reverseCards);
        container.append(cardDiv);
    }

    function reverseCards() {
        let container = $(selector);
        let cardsDiv = container.find('.card');
        container.append(cardsDiv.get().reverse());
    }

    function makeCard(face, suit) {
        let cardFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let cardSuits = ['S', 'H', 'D', 'C'];

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
                return `${face} ${cardPictures[suit]}`;
            }
        };
    }

    return {
        addCard
    }
}