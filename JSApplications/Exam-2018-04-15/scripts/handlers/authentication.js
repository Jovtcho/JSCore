let authentication = (() => {

    function (ctx) {
        let username = ctx.params['username-register'];
        let password = ctx.params['password-register'];
        let repeatPassword = ctx.params['password-register-check'];

        if (!/^[A-Za-z]{5,}$/.test(username)) {
            auth.showError('A username should be a string with at least 5 characters long.');
        } else if (password === '' || repeatPassword === '') {
            auth.showError('Passwords input fields should not be empty.');
        } else if (password !== repeatPassword) {
            auth.showError('Both passwords should match.');
        } else {
            auth.register(username, password)
                .then(function (userData) {
                    auth.saveSession(userData);
                    auth.showInfo('User registration successful.');
                    ctx.redirect('#/home');
                })
                .catch(auth.handleError);
        }
    }


})();