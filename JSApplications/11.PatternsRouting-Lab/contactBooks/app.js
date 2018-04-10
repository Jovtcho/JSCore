$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/index.html', (ctx) => {
            ctx.isAuth = auth.isAuth();

            $.ajax('./data.json')
                .then((contacts) => {
                    ctx.contacts = contacts;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        navigation: './templates/common/navigation.hbs',
                        footer: './templates/common/footer.hbs',
                        contactsPage: './templates/contacts/contactsPage.hbs',
                        contact: './templates/contacts/contact.hbs',
                        contactDetails: './templates/contacts/contactDetails.hbs',
                        contactsList: './templates/contacts/contactsList.hbs',
                        loginForm: './templates/forms/loginForm.hbs'
                    }).then(function () {
                        ctx.partials = this.partials;
                        render();
                    });
                })
                .catch(console.error);

            function render () {
                ctx.partial('./templates/welcome.hbs')
                    .then(attachEvents)
            }

            function attachEvents() {
                $('.contact').click((e) => {
                    let index = $(e.target).closest('.contact').attr('data-id');
                    ctx.selected = ctx.contacts[index];
                    render();
                });
            }
        });

        this.get('#/register', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                navigation: './templates/common/navigation.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/forms/registerForm.hbs');
            });
        });

        this.post('#/register', function () {
            let username = this.params.username;
            let password = this.params.pass;
            let repeatPassword = this.params.repeatPass;

            if (password !== repeatPassword) {
                alert('Passwords do not match.');
            } else {
                auth.register(username, password)
                    .then(() => {
                        auth.saveSession(data);
                        alert('Registered.');
                        this.redirect('#/index.html');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });

        this.post('#/login', function () {
            let username = this.params.username;
            let password = this.params.password;

            auth.login(username, password)
                .then((data) => {
                    auth.saveSession(data);
                    alert('Logged in.');
                    this.redirect('#/index.html');
                })
                .catch((err) => {
                    console.log(err);
                });

        });
    });

    app.run();
});