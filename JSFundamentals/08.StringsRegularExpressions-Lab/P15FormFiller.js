function fillForm(username, email, phone, textArr) {
    // let namePattern = /(<![A-Za-z]+!>)/g;
    // let emailPattern = /(<@[A-Za-z]+@>)/g;
    // let phonePattern = /(<\+[A-Za-z]+\+>)/g;
    //let outputText = [];
    //
    // for (let element of textArr) {
    //     element = element.replace(namePattern, username)
    //         .replace(emailPattern, email)
    //         .replace(phonePattern, phone);
    //     outputText.push(element);
    // }

    //console.log(outputText.join("\n"));

    let pattern = /<([!@\+])[A-Za-z]+(\1)>/g;

    function replaceText(match, group1) {
        switch (group1) {
            case "!":
                return username;
            case "@":
                return email;
            case "+":
                return phone;
        }
    }

    textArr.forEach(element => {
        element = element.replace(pattern, replaceText);
        console.log(element);
    });
}


fillForm('Pesho',
    'pesho@softuni.bg',
    '90-60-90',
    ['Hello, <!username!>!',
        'Welcome to your Personal profile.',
        'Here you can modify your profile freely.',
        'Your current username is: <!fdsfs!>. Would you like to change that? (Y/N)',
        'Your current email is: <@DasEmail@>. Would you like to change that? (Y/N)',
        'Your current phone number is: <+number+>. Would you like to change that? (Y/N)']);