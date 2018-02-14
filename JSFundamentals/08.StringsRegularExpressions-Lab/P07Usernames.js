function generateUsername(paramsArr) {
    let usernames = [];
    for (let email of paramsArr) {
        let splitedEmail = email.split("@");
        let domain = splitedEmail[1].split(".").map(el => el[0]).join("");
        let username = splitedEmail[0] + "." + domain;
        usernames.push(username);
    }

    return usernames.join(", ");
}

console.log(generateUsername(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com']));