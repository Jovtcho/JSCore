handlers.getWelcomeView = function (ctx) {
    if (auth.isAuth()) {
        ctx.redirect('#/editor');
    } else {
        ctx.loadPartials({
            footer: './templates/common/footer.hbs',
            signInForm: './templates/forms/signInForm.hbs',
            signUpForm: './templates/forms/signUpForm.hbs'
        }).then(function () {
           this.partial('./templates/welcome-anonymous.hbs');
        });
    }
};