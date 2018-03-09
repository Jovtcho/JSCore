function solve() {
    class Person {
        constructor(name, email) {
            this.name = name;
            this.email = email;
        }
    }

    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email);
            this.subject = subject;

        }
    }

    return {
        Person,
        Teacher
    }
}

let Person = solve().Person;
let Teacher = solve().Teacher;

let person = new Person('Pesho','pesho@gmail.com');
console.log(person);

let teacher = new Teacher('Gosho', 'gosho@mail.bg', 'JS');
console.log(teacher);