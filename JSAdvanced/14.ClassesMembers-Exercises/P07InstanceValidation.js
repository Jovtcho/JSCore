function solve() {
    class CheckingAccount {
        constructor(clientId, email, firstName, lastName) {

            this.clientId = clientId;
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
        }

        get clientId() {
            return this._clientId;
        }

        set clientId(id) {
            let regex = new RegExp(/^\d{6}$/, 'g');

            if (!regex.test(id)) {
                throw new TypeError('Client ID must be a 6-digit number');
            }

            this._clientId = id;
        }

        get email() {
            return this._email;
        }

        set email(email) {
            let regex = new RegExp(/^([A-Za-z0-9]+)@(([a-zA-Z]+\.)+[a-zA-Z]+)$/, 'g');
            //let regex = new RegExp(/^[\dA-Za-z]+@[A-Za-z.]+$/, 'g');
            if (!regex.test(email)) {
                throw new TypeError('Invalid e-mail');
            }

            this._email = email;
        }

        get firstName() {
            return this._firstName;
        }

        set firstName(firstName) {
            if (firstName.length < 3 || firstName.length > 20) {
                throw new TypeError('First name must be between 3 and 20 characters long');
            }

            let regex = new RegExp(/^([A-Za-z]+)$/, 'g');
            if (!regex.test(firstName)) {
                throw new TypeError('First name must contain only Latin characters');
            }

            this._firstName = firstName;
        }

        get lastName() {
            return this._lastName;
        }

        set lastName(lastName) {
            if (lastName.length < 3 || lastName.length > 20) {
                throw new TypeError('Last name must be between 3 and 20 characters long');
            }

            let regex = new RegExp(/^([A-Za-z]+)$/, 'g');
            if (!regex.test(lastName)) {
                throw new TypeError('Last name must contain only Latin characters');
            }

            this._lastName = lastName;
        }
    }

    let test = new CheckingAccount(100000, 'pesho@pesho.bg', 'Pesho', 'Pesho9');
    console.log(test);
    // let test2 = new CheckingAccount(1, 'pesho@pesho@bg', 'Pesho', 'Peshev');
    // console.log(test2);

}

solve();