class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    toString() {
        let className = this.constructor.name;
        return `${className} (name: ${this.name}, email: ${this.email})`
    }
}

class Teacher extends Person {
    constructor(name, email, subject) {
        super(name, email);
        this.subject = subject;
    }

    toString() {
        return super.toString().slice(0, -1) + `, subject: ${this.subject})`
    }
}

class Student extends Person {
    constructor(name, email, course) {
        super(name, email);
        this.course = course;
    }

    toString() {
        return super.toString().slice(0, -1) + `, course: ${this.course})`
    }
}


function extendClass(classToExtend) {
    classToExtend.prototype.species = 'Human';
    classToExtend.prototype.toSpeciesString = function () {
        return `I am a ${this.species}. ${this.toString()}`
    }
}


let person1 = new Person('Gosho', 'gosho@gmail.com');
//console.log(person1.toSpeciesString());

extendClass(Person);
let person2 = new Person('Gosho', 'gosho@gmail.com');
console.log(person2.toSpeciesString());

let teacher = new Teacher('Gosho', 'gosho@mail.bg', 'JS');
console.log(teacher.toSpeciesString());