/**
 * Created by Jo on 1/9/2018.
 */

function filterOlderPerson(minAge, firstPersonName, firstPersonAge, secondPersonName, secondPersonAge) {
    let firstPerson = {name: firstPersonName, age: firstPersonAge};
    let secondPerson = {name: secondPersonName, age: secondPersonAge};

    if (firstPerson.age >= minAge) {
        console.log(firstPerson);
    }

    if (secondPerson.age >= minAge) {
        console.log(secondPerson);
    }
}

filterOlderPerson(12, 'Ivan', 15, 'Asen', 9);