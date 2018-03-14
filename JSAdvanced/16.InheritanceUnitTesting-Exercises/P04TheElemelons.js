function solve() {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError('Abstract class cannot be instantiated directly');
            }
            this.weight = Number(weight);
            this.melonSort = melonSort;
            this._elementIndex = this.weight * this.melonSort.length;
            this.element = "";
        }

        get elementIndex() {
            return this._elementIndex;
        }

        toString() {
            let output = `Element: ${this.element}\n`;
            output += `Sort: ${this.melonSort}\n`;
            output += `Element Index: ${this.elementIndex}`;
            return output;
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Water';
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Fire';
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Earth';
        }

    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Air';
        }
    }

    class Melolemonmelon extends Firemelon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Water';
            this.elements = ['Fire', 'Earth', 'Air', 'Water'];
            this.index = 0;
        }

        morph() {
            this.element = this.elements[this.index++ % 4];
        }
    }

    return {
        Melon,
        Watermelon,
        Firemelon,
        Earthmelon,
        Airmelon,
        Melolemonmelon
    }
}

let Melon = solve().Melon;
let Watermelon = solve().Watermelon;
let Firemelon = solve().Firemelon;
let Earthmelon = solve().Earthmelon;
let Airmelon = solve().Airmelon;

let watermelon = new Watermelon(12.5, 'Kingsize');
console.log(watermelon.toString());
let firemelon = new Firemelon(100, 'Small');
console.log(firemelon.toString());
let earthmelon = new Earthmelon(23, 'Special');
console.log(earthmelon.toString());
let airmelon = new Airmelon(1, 'Unique');
console.log(airmelon.toString());
console.log('===============================');
let Melolemonmelon = solve().Melolemonmelon;
let test = new Melolemonmelon(20, 'Test');
console.log(test.toString());
test.morph();
console.log(test.toString());
test.morph();
console.log(test.toString());
test.morph();
console.log(test.toString());
test.morph();
console.log(test.toString());
test.morph();
console.log(test.toString());
