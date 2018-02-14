function validateEmail(email) {
    let pattern = new RegExp("^[A-Za-z0-9]+@[a-z]+\.[a-z]+$", "g");
    let isValid = pattern.test(email);

    return isValid ? "Valid" : "Invalid";
}

console.log(validateEmail("valid@email.bg"));
console.log(validateEmail("invalid@emai1.bg"));