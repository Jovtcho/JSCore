let result = (function () {
    let suits = {
        CLUBS: "\u2663",    // ♣
        DIAMONDS: "\u2666", // ♦
        HEARTS: "\u2665",   // ♥
        SPADES: "\u2660"    // ♠
    };

    let faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    class Card {
        constructor(face, suit) {
            this.face = face;
            this.suit = suit;
        }

        set face(face) {
            if (!faces.includes(face)) {
                throw new TypeError('There is no such face.');
            }

            this._face = face;
        }

        get face() {
            return this._face;
        }

        set suit(suit) {
            if (!Object.keys(suits).map(key => suits[key]).includes(suit)) {
                throw new TypeError('There is no such suit.');
            }

            this._suit = suit;
        }

        get suit() {
            return this._suit;
        }
    }

    return {
        Suits: suits,
        Card: Card
    }
})();

let Card = result.Card;
let Suits = result.Suits;

let card = new Card("Q", Suits.CLUBS);
console.log(card);
card.face = "A";
card.suit = Suits.DIAMONDS;
console.log(card);
let card2 = new Card('R', Suits.HEARTS);
