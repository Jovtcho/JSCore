$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        //Home page
        this.get('index.html', displayHome);
        this.get('#/home', displayHome);

        //Register logic
        this.post('#/register', authService.register);

        //Login logic
        this.post('#/login', authService.login);

        //Logout logic
        this.get('#/logout', authService.logout);

        //Catalog logic
        this.get('#/catalog', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            postService.getAllPosts()
                .then(function (posts) {
                    posts.forEach((post, index) => {
                        post.rank = index + 1;
                        post.time = calcTime(post._kmd.ect);
                        post.isAuthor = post._acl.creator === sessionStorage.getItem('userId');
                    });
                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.posts = posts;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        menu: './templates/common/menu.hbs',
                        post: './templates/catalog/post.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/catalogPage.hbs');
                    });
                })
                .catch(auth.handleError)
        });

        //Create post form
        this.get('#/create/post', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                menu: './templates/common/menu.hbs',
                createPostForm: './templates/createPost/createPostForm.hbs'
            }).then(function () {
                this.partial('./templates/createPost/createPostPage.hbs');
            })
        });

        //Create post form logic
        this.post('#/create/post', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            let author = sessionStorage.getItem('username');
            let url = ctx.params.url;
            let title = ctx.params.title;
            let imageUrl = ctx.params.imageUrl;
            let description = ctx.params.description;

            if (url === '') {
                auth.showError('URL can not be empty.');
            } else if (title === '') {
                auth.showError('Title can not be empty.');
            } else if (!url.startsWith('http')) {
                auth.showError('URL is not valid link.')
            } else {
                postService.createPost(author, title, description, url, imageUrl)
                    .then(function () {
                        auth.showInfo('Post created.');
                        ctx.redirect('#/catalog');
                    })
                    .catch(auth.handleError);
            }
        });

        //Edit post form
        this.get('#/editPost/:postId', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            let postId = ctx.params.postId;
            postService.getPostById(postId)
                .then(function (post) {
                    ctx.post = post;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        menu: './templates/common/menu.hbs',
                        editPostForm: './templates/editPost/editPostForm.hbs'
                    }).then(function () {
                        this.partial('./templates/editPost/editPostPage.hbs');
                    });
                })
                .catch(auth.handleError);
        });

        //Edit post form logic
        this.post('#/editPost', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            let postId = ctx.params.postId;
            let author = sessionStorage.getItem('username');
            let url = ctx.params.url;
            let title = ctx.params.title;
            let imageUrl = ctx.params.imageUrl;
            let description = ctx.params.description;

            if (url === '') {
                auth.showError('URL can not be empty.');
            } else if (title === '') {
                auth.showError('Title can not be empty.');
            } else if (!url.startsWith('http')) {
                auth.showError('URL is not valid link.')
            } else {
                postService.editPost(postId, author, title, description, url, imageUrl)
                    .then(function () {
                        auth.showInfo(`Post ${title} updated.`);
                        ctx.redirect('#/catalog');
                    })
                    .catch(auth.handleError);
            }
        });

        //Delete post logic
        this.get('#/deletePost/:postId', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            let postId = ctx.params.postId;
            postService.deletePost(postId)
                .then(function () {
                    auth.showError('Post deleted.');
                    ctx.redirect('#/catalog');
                })
                .catch(auth.handleError);
        });

        //Catalog my posts
        this.get('#/myposts', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            postService.getMyPosts(ctx.username)
                .then(function (posts) {
                    posts.forEach((post, index) => {
                        post.rank = index + 1;
                        post.time = calcTime(post._kmd.ect);
                        post.isAuthor = post._acl.creator === sessionStorage.getItem('userId');
                    });

                    ctx.posts = posts;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        menu: './templates/common/menu.hbs',
                        post: './templates/catalog/post.hbs'
                    }).then(function () {
                        this.partial('./templates/myPosts/myPostsPage.hbs');
                    });
                })
                .catch(auth.handleError);


        });

        //Detailed post info and comments
        this.get('#/details/:postId', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            let postId = ctx.params.postId;

            let postPromise = postService.getPostById(postId);
            let commentsPromise = commentService.getAllCommentsByPost(postId);

            Promise.all([postPromise, commentsPromise])
                .then(function ([post, comments]) {
                    post.time = calcTime(post._kmd.ect);
                    ctx.isAuthor = post._acl.creator === sessionStorage.getItem('userId');
                    comments.forEach(comment => {
                        comment.time = calcTime(comment._kmd.ect);
                        comment.isCommentAuthor = comment._acl.creator === sessionStorage.getItem('userId');
                    });
                    ctx.post = post;
                    ctx.comments = comments;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        menu: './templates/common/menu.hbs',
                        postDetails: './templates/comments/postDetails.hbs',
                        createComment: './templates/comments/createComment.hbs',
                        comment: './templates/comments/comment.hbs'
                    }).then(function () {
                        this.partial('./templates/comments/detailsPage.hbs');
                    });
                })
                .catch(auth.handleError);
        });

        //Create comment
        this.post('#/createComment', function (ctx) {
            let postId = ctx.params.postId;
            let author = sessionStorage.getItem('username');
            let content = ctx.params.content;

            if (content === "") {
                auth.showError('Comment can not be empty');
            } else {
                commentService.createComment(postId, author, content)
                    .then(function () {
                        auth.showInfo('Comment created.');
                        ctx.redirect(`#/details/${postId}`);
                    })
                    .catch(auth.handleError);
            }
        });

        //Delete own comment
        this.get('#/deleteComment/:commentId/post/:postId', function (ctx) {
            let postId = ctx.params.postId;
            let commentId = ctx.params.commentId;

            commentService.deleteComment(commentId)
                .then(function () {
                    auth.showInfo('Comment deleted.');
                    window.history.go(-1);
                    //ctx.redirect(`#/details/${postId}`);
                })
                .catch(auth.handleError);
        });

        //Display home page logic
        function displayHome(ctx) {
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/forms/loginForm.hbs',
                registerForm: './templates/forms/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/home/welcome.hbs');
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
