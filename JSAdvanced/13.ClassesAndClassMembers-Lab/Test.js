function makeTest() {
    class Person {
        constructor(firstName, lastName, age) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
        }


        get firstName() {
            return this._firstName;
        }

        set firstName(value) {
            this._firstName = value;
        }


        get lastName() {
            return this._lastName;
        }

        set lastName(value) {
            this._lastName = value;
        }


        get age() {
            return this._age;
        }

        set age(value) {
            this._age = value;
        }
    }



    let pesho = new Person("Pesho", "Peshev", 30);
    console.log(pesho);
}

makeTest();
