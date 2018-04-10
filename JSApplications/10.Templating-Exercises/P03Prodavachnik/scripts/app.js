$(() => {
    $(document).on({
        ajaxStart: function () {
            $("#loadingBox").show()
        },
        ajaxStop: function () {
            $("#loadingBox").hide()
        }
    });

    $("#infoBox, #errorBox").on('click', function () {
        $(this).fadeOut()
    });

    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        //Home page
        this.get('index.html', displayHome);
        this.get('#/home', displayHome);

        //Login page
        this.get('#/login', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authToken') !== null;
            ctx.username = sessionStorage.getItem('username');
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });
        });

        //Login logic
        this.post('#/login', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then(function (userData) {
                    auth.saveSession(userData);
                    errorHandler.showInfo('You are logged in successfully.');
                    displayHome(ctx);
                })
                .catch(errorHandler.handleError);
        });

        //Logout logic
        this.get('#/logout', function (ctx) {
            let username = sessionStorage.getItem('username');
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    errorHandler.showInfo(`User ${username} logged out successfully.`);
                    displayHome(ctx);
                })
                .catch(errorHandler.handleError);
        });

        //Register page
        this.get('#/register', function (ctx) {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            });
        });

        //Register logic
        this.post('#/register', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPassword = ctx.params.repeatPassword;

            if (password !== repeatPassword) {
                errorHandler.showError('Passwords do not match.');
            } else {
                auth.register(username, password)
                    .then(function (userData) {
                        auth.saveSession(userData);
                        errorHandler.showInfo('You are registered and logged in successfully.');
                        displayHome(ctx);
                    })
                    .catch(errorHandler.handleError);
            }
        });

        //Load ads catalog
        this.get('#/listAds', listAds);

        //Create ad form
        this.get('#/createAd', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authToken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs')
            })
        });

        //Create ad logic
        this.post('#/createAd', function (ctx) {
            let title = ctx.params.title;
            let description = ctx.params.description;
            let datePublished = ctx.params.datePublished;
            let price = ctx.params.price;
            let imageUrl = ctx.params.imageUrl;
            let publisher = sessionStorage.getItem('username');

            if (title.length === 0) {
                errorHandler.showError('Title cannot be empty');
                return;
            }

            if (price.length === 0) {
                errorHandler.showError('Price cannot be empty');
                return;
            }

            let data = {
                title,
                description,
                publisher,
                datePublished,
                price,
                imageUrl,
            };

            requestor.post('appdata', 'ads', 'Kinvey', data)
                .then(function (adInfo) {
                    //auth.saveSession(adInfo);
                    listAds(ctx);
                    errorHandler.showInfo('Ad created');
                })
                .catch(errorHandler.handleAjaxError)
        });

        //Delete ad
        this.get('#/deleteAd/:id', function (ctx) {
            let adId = ctx.params.id.slice(1);
            requestor.remove('appdata', `ads/${adId}`, 'Kinvey')
                .then(function () {
                    listAds(ctx);
                    errorHandler.showInfo('Ad deleted.');
                })
                .catch(errorHandler.handleError);
        });

        //Edit ad
        this.get('#/editAd/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authToken') !== null;
            ctx.username = sessionStorage.getItem('username');
            let adId = ctx.params.id.slice(1);
            requestor.get('appdata', `ads/${adId}`, 'Kinvey')
                .then(function (adInfo) {
                    ctx.adId = adId;
                    ctx.publisher = adInfo.publisher;
                    ctx.title = adInfo.title;
                    ctx.description = adInfo.description;
                    ctx.datePublished = adInfo.datePublished;
                    ctx.price = adInfo.price;
                    ctx.imageUrl = adInfo.imageUrl;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        editForm: './templates/edit/editForm.hbs'
                    }).then(function () {
                        this.partial('./templates/edit/editPage.hbs');
                    });
                })
                .catch(errorHandler.handleError)
        });

        //Edit ad logic
        this.post('#/editAd/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authToken') !== null;
            ctx.username = sessionStorage.getItem('username');
            let adId = ctx.params.id.slice(1);
            let publisher = ctx.params.publisher;
            let title = ctx.params.title;
            let description = ctx.params.description;
            let datePublished = ctx.params.datePublished;
            let price = ctx.params.price;
            let imageUrl = ctx.params.imageUrl;

            let data = {
                title,
                description,
                publisher,
                datePublished,
                price,
                imageUrl
            };

            requestor.update('appdata', `ads/${adId}`, 'Kinvey', data)
                .then(function () {
                    displayHome(ctx);
                    listAds(ctx);
                    errorHandler.showInfo('Ad edited.');
                })
                .catch(errorHandler.handleError)
        });

        //Read more details
        this.get('#/listAds/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authToken') !== null;
            ctx.username = sessionStorage.getItem('username');
            let adId = ctx.params.id.slice(1);
            requestor.get('appdata', `ads/${adId}`, 'Kinvey')
                .then(function (adInfo) {
                    ctx.imageUrl = adInfo.imageUrl;
                    ctx.title = adInfo.title;
                    ctx.description = adInfo.description;
                    ctx.publisher = adInfo.publisher;
                    ctx.datePublished = adInfo.datePublished;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        details: './templates/catalog/details.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/detailsPage.hbs');
                    });
                })
                .catch(errorHandler.handleError)
        });

        function displayHome(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authToken') !== null;
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs');
            });
        }

        //Display ads catalog logic
        async function listAds(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authToken') !== null;
            ctx.username = sessionStorage.getItem('username');
            try {
                let response = await requestor.get('appdata', 'ads', 'Kinvey');
                let ads = response.reverse();
                if (ads.length === 0) {
                    ctx.noAds = true;
                }
                for (let ad of ads) {
                    if (ad.publisher === sessionStorage.getItem('username')) {
                        ad.isPublisher = true;
                    }
                }
                ctx.ads = ads;
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    ad: './templates/catalog/ad.hbs',
                    adsCatalog: './templates/catalog/adsCatalog.hbs'
                }).then(function () {
                    this.partial('./templates/catalog/adsPage.hbs')
                });
                ctx.redirect('#/listAds');
            } catch (err) {
                errorHandler.handleAjaxError(err);
            }
        }

    });

    app.run();
});

