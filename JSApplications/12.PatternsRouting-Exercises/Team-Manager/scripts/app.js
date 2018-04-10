$(() => {
    const app = Sammy('#main', function () {
        // TODO: Define all the routes
        this.use('Handlebars', 'hbs');

        //Home page
        this.get('index.html', displayHome);
        this.get('#/home', displayHome);

        //About page
        this.get('#/about', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/about/about.hbs');
            });
        });

        //Login page
        this.get('#/login', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
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
                    auth.showInfo('Logged in successful.');
                    displayHome(ctx);
                })
                .catch(auth.handleError);
        });

        //Logout logic
        this.get('#/logout', function (ctx) {
            let username = sessionStorage.getItem('username');
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo(`${username} logged out.`);
                    displayHome(ctx);
                })
                .catch(auth.handleError);
        });

        //Register page
        this.get('#/register', function (ctx) {
            this.loadPartials({
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
                auth.showError('Passwords do not match.');
            } else {
                auth.register(username, password, repeatPassword)
                    .then(function (userData) {
                        auth.saveSession(userData);
                        auth.showInfo('Registered successful.');
                        displayHome(ctx);
                    })
                    .catch(auth.handleError);
            }
        });

        //Load team catalog
        this.get('#/catalog', displayCatalaog);

        this.get('#/create', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            })
        });

        //Create team logic
        this.post('#/create', function (ctx) {
            let teamName = ctx.params.name;
            let teamComment = ctx.params.comment;

            teamsService.createTeam(teamName, teamComment)
                .then(function (teamData) {
                    teamsService.joinTeam(teamData._id)
                        .then(function (userData) {
                            auth.saveSession(userData);
                            auth.showInfo(`Team ${teamName} created.`);
                            displayCatalaog(ctx);
                        })
                        .catch(auth.handleError)
                })
                .catch(auth.handleError)
        });

        //Team details logic
        this.get('#/catalog/:id', async function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            let teamId = ctx.params.id.slice(1);
            let members;
            await teamsService.getMembers(teamId)
                .then(function (teamMembers) {
                    members = teamMembers.map(mem => {
                        return {username: mem.username}
                    });
                })
                .catch(auth.handleError);

            teamsService.loadTeamDetails(teamId)
                .then(function (teamDetails) {
                    ctx.teamId = teamId;
                    ctx.name = teamDetails.name;
                    ctx.comment = teamDetails.comment;
                    ctx.isAuthor = teamDetails._acl.creator === sessionStorage.getItem('userId');
                    ctx.isOnTeam = teamDetails._id === sessionStorage.getItem('teamId');
                    ctx.members = members;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        teamMember: './templates/catalog/teamMember.hbs',
                        teamControls: './templates/catalog/teamControls.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/details.hbs');
                    })
                })
                .catch(auth.handleError)
        });

        //Join team by ID logic
        this.get('#/join/:id', function (ctx) {
            let teamId = ctx.params.id.slice(1);

            teamsService.joinTeam(teamId)
                .then(function (userData) {
                    auth.saveSession(userData);
                    auth.showInfo('Joined to the team.');
                    displayCatalaog(ctx);
                })
                .catch(auth.handleError)
        });

        //Leave team logic
        this.get('#/leave', function (ctx) {
            teamsService.leaveTeam()
                .then(function (userData) {
                    auth.saveSession(userData);
                    auth.showInfo('Left the team.');
                    displayCatalaog(ctx);
                })
                .catch(auth.handleError)
        });

        //Edit team form load
        this.get('#/edit/:id', function (ctx) {
            let teamId = ctx.params.id.slice(1);

            teamsService.loadTeamDetails(teamId)
                .then(function (teamData) {
                    ctx.teamId = teamId;
                    ctx.name = teamData.name;
                    ctx.comment = teamData.comment;
                    ctx.loadPartials({
                            header: './templates/common/header.hbs',
                            footer: './templates/common/footer.hbs',
                            editForm: './templates/edit/editForm.hbs'
                        }
                    ).then(function () {
                        this.partial('./templates/edit/editPage.hbs');
                    })
                })
                .catch(auth.handleError)
        });

        //Edit team logic
        this.post('#/edit/:id', function (ctx) {
            let teamId = ctx.params.id.slice(1);
            let teamName = ctx.params.name;
            let teamComment = ctx.params.comment;

            teamsService.edit(teamId, teamName, teamComment)
                .then(function () {
                    auth.showInfo(`Team ${teamName} edited.`);
                    displayCatalaog(ctx);
                })
                .catch(auth.handleError)
        });

        function displayHome(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs');
            });
        }

        function displayCatalaog(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            teamsService.loadTeams()
                .then(function (teams) {
                    ctx.hasNoTeam = sessionStorage.getItem('teamId') === null
                        || sessionStorage.getItem('teamId') === 'undefined';
                    ctx.teams = teams;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        team: './templates/catalog/team.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/teamCatalog.hbs')
                    })
                })
                .catch(auth.handleError);
        }

    });

    app.run();
});