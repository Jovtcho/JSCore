$(() => {

    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        //Index page
        this.get('index.html', displayIndex);
        this.get('#/login', displayIndex);

        //Login page logic
        this.post('#/login', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then(function (userData) {
                    userData.subscriptions = userData.subscriptions || [];
                    auth.saveSession(userData);
                    auth.showInfo('Login successful.');
                    ctx.redirect('#/feed');
                })
                .catch(auth.handleError);
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

        //Register page logic
        this.post('#/register', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPassword = ctx.params.repeatPass;

            if (!/^[A-Za-z]{5,}$/.test(username)) {
                auth.showError('A username should be a string with at least 5 characters long.');
            } else if (password === '' || repeatPassword === '') {
                auth.showError('Passwords input fields should not be empty.');
            } else if (password !== repeatPassword) {
                auth.showError('Both passwords should match.');
            } else {
                auth.register(username, password)
                    .then(function (userData) {
                        userData.subscriptions = userData.subscriptions || [];
                        auth.saveSession(userData);
                        auth.showInfo('User registration successful.');
                        ctx.redirect('#/feed');
                    })
                    .catch(auth.handleError);
            }
        });

        this.get('#/logout', function (ctx) {
            let username = sessionStorage.getItem('username');
            auth.logout()
                .then(function () {
                    auth.clearSession();
                    auth.showInfo(`Logout successful.`);
                    ctx.redirect('#/login');
                })
                .catch(auth.handleError);
        });

        this.get('#/feed', async function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }

            let username = sessionStorage.getItem('username');
            let subscriptions = sessionStorage.getItem('subscriptions');
            //ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = username;

            await chirpService.getUserChirps(username)
                .then(function (chirpsData) {
                    ctx.postedChirps = chirpsData.length;
                })
                .catch(auth.handleError);

            await chirpService.getFollowing(username)
                .then(function (followingData) {
                    //ctx.following = JSON.parse(followingData[0].subscriptions).length;
                    if (followingData[0].subscriptions === undefined) {
                        ctx.following = 0;
                    } else {
                        ctx.following = followingData[0].subscriptions.length;
                    }
                })
                .catch(auth.handleError);

            await chirpService.getFollowers(username)
                .then(function (followersData) {
                    ctx.followers = followersData.length;
                })
                .catch(auth.handleError);

            await chirpService.getChirpsFromSubscriptions(subscriptions)
                .then(function (subscriptionsData) {
                    subscriptionsData.forEach(chirp => chirp.time = calcTime(chirp._kmd.ect));
                    ctx.chirps = subscriptionsData;
                })
                .catch(auth.handleError);

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                menu: './templates/common/menu.hbs',
                createChirpForm: './templates/feed/createChirpForm.hbs',
                chirp: './templates/feed/chirp.hbs'
            }).then(function () {
                this.partial('./templates/feed/feedPage.hbs');
            });
        });

        this.post('#/createChirp', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }

            let author = sessionStorage.getItem('username');
            let text = ctx.params.text;

            if (text === '') {
                auth.showError('A chirp text should not be empty.');
                return;
            }

            if (text.length > 150) {
                auth.showError('A chirp text should not contain more than 150 symbols.');
                return;
            }
            let data = {author, text};

            chirpService.createChirp(data)
                .then(function () {
                    auth.showInfo('Chirp published.');
                    ctx.redirect(`#/feed/${author}`);
                })
                .catch(auth.handleError);

        });

        this.get('#/feed/:author', async function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }

            let username = sessionStorage.getItem('username');
            let author = ctx.params.author;
            let requestUser = username;
            ctx.loggedIn = username === author;
            ctx.username = username;

            if (author !== username) {
                requestUser = author;
            }
            ctx.requestUser = requestUser;

            await chirpService.getUserChirps(requestUser)
                .then(function (chirpsData) {
                    chirpsData.forEach(chirp => {
                        chirp.time = calcTime(chirp._kmd.ect);
                        if (chirp.author === username) {
                            chirp.isAuthor = username;
                        }
                    });
                    ctx.chirps = chirpsData;
                    ctx.postedChirps = chirpsData.length;
                })
                .catch(auth.handleError);

            await chirpService.getFollowing(requestUser)
                .then(function (followingData) {
                    //ctx.following = JSON.parse(followingData[0].subscriptions).length;
                    if (followingData[0].subscriptions === undefined) {
                        ctx.following = 0;
                    } else {
                        ctx.following = followingData[0].subscriptions.length;
                    }
                })
                .catch(auth.handleError);

            await chirpService.getFollowers(requestUser)
                .then(function (followersData) {
                    let followers = followersData.map(user => user.username);
                    if (followers.includes(username)) {
                        ctx.isFollowed = true;
                    }
                    ctx.followers = followersData.length;
                })
                .catch(auth.handleError);


            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                menu: './templates/common/menu.hbs',
                createChirpForm: './templates/feed/createChirpForm.hbs',
                chirp: './templates/feed/chirp.hbs'
            }).then(function () {
                this.partial('./templates/feed/mePage.hbs');
            });

        });

        this.get('#/delete/:chirpId', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }

            let chirpId = ctx.params.chirpId;

            requester.remove('appdata', `chirps/${chirpId}`, 'Kinvey')
                .then(function () {
                    auth.showInfo('Chirp deleted.');
                    ctx.redirect(`#/feed/${sessionStorage.getItem('username')}`);
                })
                .catch(auth.handleError);
        });

        this.get('#/discover', async function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }

            ctx.username = sessionStorage.getItem('username');
            let users;
            await userService.getAllUsers()
                .then(async function (usersData) {
                    users = usersData.filter(user => user.username !== sessionStorage.getItem('username'));
                    for (let user of users) {
                        await chirpService.getFollowers(user.username)
                            .then(function (followersData) {
                                user.followers = followersData.length;
                            })
                            .catch(auth.handleError);
                    }
                })
                .catch(auth.handleError);

            ctx.users = users;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                menu: './templates/common/menu.hbs',
                user: './templates/discover/user.hbs'
            }).then(function () {
                this.partial('./templates/discover/discoverPage.hbs');
            })

        });

        this.get('#/follow/:user', async function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }

            ctx.username = sessionStorage.getItem('username');
            let user = ctx.params.user;
            let subs = JSON.parse(sessionStorage.getItem('subscriptions'));

            userService.followUser(user, subs)
                .then(function (response) {
                    auth.showInfo('Subscribed to ' + user);
                    auth.saveSession(response);
                    ctx.redirect(`#/feed/${user}`);
                })
                .catch(auth.handleError);
        });

        this.get('#/unfollow/:user', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }

            ctx.username = sessionStorage.getItem('username');
            let user = ctx.params.user;
            let subs = JSON.parse(sessionStorage.getItem('subscriptions'));

            userService.unfollowUser(user, subs)
                .then(function (response) {
                    auth.showInfo(`Unsubscribed to ${user}`);
                    auth.saveSession(response);
                    ctx.redirect(`#/feed/${user}`);
                })
                .catch(auth.handleError);
        });


        function displayIndex(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                //menu: './templates/common/menu.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });
        }

        function calcTime(dateIsoFormat) {
            let diff = new Date - (new Date(dateIsoFormat));
            diff = Math.floor(diff / 60000);
            if (diff < 1) return 'less than a minute';
            if (diff < 60) return diff + ' minute' + pluralize(diff);
            diff = Math.floor(diff / 60);
            if (diff < 24) return diff + ' hour' + pluralize(diff);
            diff = Math.floor(diff / 24);
            if (diff < 30) return diff + ' day' + pluralize(diff);
            diff = Math.floor(diff / 30);
            if (diff < 12) return diff + ' month' + pluralize(diff);
            diff = Math.floor(diff / 12);
            return diff + ' year' + pluralize(diff);
            function pluralize(value) {
                if (value !== 1) return 's';
                else return '';
            }
        }
    });


    app.run();
});