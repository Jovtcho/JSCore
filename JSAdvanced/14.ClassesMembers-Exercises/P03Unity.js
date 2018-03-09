function solve() {
    class Rat {
        constructor(name) {
            this.name = name;
            this.unitedRats = [];
        }

        unite(otherRat) {
            if (otherRat instanceof Rat) {
                this.unitedRats.push(otherRat);
            }
        }

        getRats() {
            return this.unitedRats;
        }

        toString() {
            return this.name + '\n' + this.unitedRats.map(r => `##${r.name}`).join('\n');
        }
    }


    let rat = new Rat("Pesho");
    console.log(rat.toString()); //Pesho

    console.log(rat.getRats()); //[]

    rat.unite(new Rat("Gosho"));
    rat.unite(new Rat("Sasho"));
    console.log(rat.getRats());
    console.log(rat.toString());
}

solve();