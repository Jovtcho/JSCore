function testSomething() {
    let thisIsObject = {
        'Cow': 'Moo',
        'Cat': 'Meow',
        'Dog': 'Bark'
    };

    console.log(thisIsObject);

    delete thisIsObject['Cow'];

    console.log(thisIsObject);

    console.log(Number.MAX_VALUE);
    console.log(Number.MAX_SAFE_INTEGER);
}

testSomething();