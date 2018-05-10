let authService = (() => {

    function register(ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;
        let repeatPassword = ctx.params.repeatPass;

        if (!/^[A-Za-z]{3,}$/.test(username)) {
            auth.showError('A username should be at least 3 characters' +
                ' long and should contain only english alphabet letters.');
        } else if (!/^[A-Za-z0-9]{6,}$/.test(password)) {
            auth.showError('A user‘s password should be at least 6 characters long' +
                ' and should contain only english alphabet letters and digits.');
        } else if (password !== repeatPassword) {
            auth.showError('Both passwords should match.');
        } else {
            auth.register(username, password)
                .then(function (userData) {
                    auth.saveSession(userData);
                    auth.showInfo('User registration successful.');
                    //TODO load catalog
                    ctx.redirect('#/catalog');
                })
                .catch(auth.handleError);
        }
    }

    function login(ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;

        auth.login(username, password)
            .then(function (userData) {
                auth.saveSession(userData);
                auth.showInfo('Login successful.');
                //TODO load catalog
                ctx.redirect('#/catalog');
            })
            .catch(auth.handleError);
    }

    function logout(ctx) {
        let username = sessionStorage.getItem('username');
        auth.logout()
            .then(function () {
                auth.clearSession();
                auth.showInfo(`Logout successful.`);
                ctx.redirect('#/home');
            })
            .catch(auth.handleError);
    }


    return {
        register,
        login,
        logout
    }
})();