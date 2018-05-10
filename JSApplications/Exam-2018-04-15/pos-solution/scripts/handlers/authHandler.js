handlers.registerUser = function (ctx) {
    let username = ctx.params.username;
    let password = ctx.params.password;
    let repeatPass = ctx.params.repeatPass;

    if (username.length < 5) {
        notify.showError('Username must be at least 5 characters long!');
    } else if (password === '') {
        notify.showError('Password must be non-empty!');
    } else if (repeatPass !== password) {
        notify.showError('Passwords must match!');
    } else {
        auth.register(username, password)
            .then((userData) => {
                auth.saveSession(userData);
                notify.showInfo('User registration successful.');
                ctx.redirect('#/editor');
            })
            .catch(notify.handleError)
    }
};

handlers.loginUser = function (ctx) {
    let username = ctx.params.username;
    let password = ctx.params.password;

    auth.login(username, password)
        .then((userData) => {
            auth.saveSession(userData);
            notify.showInfo('Login successful.');
            ctx.redirect('#/editor');
        })
        .catch(notify.handleError);
};

handlers.logoutUser = function (ctx) {
    auth.logout()
        .then(() => {
            sessionStorage.clear();
            notify.showInfo('Logout successful!');
            ctx.redirect('#/welcome');
        })
        .catch(notify.handleError);
};