function validate() {
    let username = $('#username');
    let email = $('#email');
    let password = $('#password');
    let confirmPassword = $('#confirm-password');
    let companyCheckBox = $('#company');
    let companyInfo = $('#companyInfo');
    let companyNumber = $('#companyNumber');
    let submit = $('#submit');
    let validationDiv = $('#valid');
    let isFormValid = true;

    companyCheckBox.on('change', function () {
        if (companyCheckBox.is(':checked')) {
            companyInfo.css('display', 'block');
        } else {
            companyInfo.css('display', 'none');
        }
    });

    submit.on('click', function (event) {
        event.preventDefault();
        isFormValid = true;
        validateForm();
        if (isFormValid) {
            validationDiv.css('display', 'block');
        } else {
            validationDiv.css('display', 'none');
        }
    });

    function validateForm() {
        validateInput(username, /^[A-Za-z0-9]{3,20}$/g);
        validateInput(email, /^.*?@.*?\..*?$/g);
        if (password.val() === confirmPassword.val()) {
            validateInput(password, /^\w{5,15}$/g);
            validateInput(confirmPassword, /^\w{5,15}$/g);
        } else {
            password.css('border', 'solid red');
            confirmPassword.css('border', 'solid red');
            isFormValid = false;
        }

        if (companyCheckBox.is(':checked')) {
            validateCompanyNumber(companyNumber);
        }
    }

    function validateInput(input, regexPattern) {
        if (regexPattern.test(input.val())) {
            input.css('border', 'none');
        } else {
            input.css('border', 'solid red');
            isFormValid = false;
        }
    }

    function validateCompanyNumber(input) {
        let number = Number(input.val());
        if (1000 <= number && number <= 9999) {
            input.css('border', 'none');
        } else {
            input.css('border', 'solid red');
            isFormValid = false;
        }
    }
}
