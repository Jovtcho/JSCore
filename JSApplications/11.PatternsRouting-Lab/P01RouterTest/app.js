const app = Sammy('#main', function () {
    // this.get('index.html', function () {
    //     this.swap('<h2>This is home page</h2>');
    // });
    //
    // this.get('contacts', function () {
    //     this.swap('<h2>This is contact page</h2>');
    // });
    //
    // this.get('about', function () {
    //     this.swap('<h2>This is about page</h2>');
    // });

    this.use('Handlebars', 'hbs');

    this.get('index.html', (context) => {
        context.swap('<h2>This is home page</h2>');
    });

    this.get('#/contacts', (context) => {
        context.swap('<h2>This is contact page</h2>');
    });

    this.get('#/catalog', displayCatalog);

    this.get('#/catalog/:productID', displayCatalog);

    function displayCatalog(context) {
        context.swap('<h2>This is catalog page</h2>' +
            '<a href="#/catalog/p01">Product 01</a><br>' +
            '<a href="#/catalog/p02">Product 02</a><br>' +
            '<a href="#/catalog/p03">Product 03</a><br>');

        //console.log(context.params);
    }

    this.get('#/login', (context) => {
        context.swap(`<h2>This is login page</h2><br>
                        <form action="#/login" method="post">
                        <label for="user">Username: </label>
                        <input id="user" name="username" type="text"><br>
                        <label for="pass">Password: </label>
                        <input id="pass" name="password" type="password"><br>
                        <input type="submit" value="Login">
                    </form>`);

    });

    this.post('#/login', (context) => {
        console.log(context.params.username);
        console.log(context.params.password);
        context.redirect('#/catalog');
    });

    this.get('#/greet', function (context) {
        context.swap('<h2>This is greeting page</h2>' +
            '<a href="#/greet/Pesho">Pesho</a><br>' +
            '<a href="#/greet/Gosho">Gosho</a><br>' +
            '<a href="#/greet/Maria">Maria</a><br>');
    });

    this.get('#/greet/:name', function (context) {
        //here context = this;
        //console.log(context);
        //console.log(this);

        context.loadPartials({
            firstLine: './templates/name-partial.hbs',
            secondLine: './templates/body-partial.hbs'
        }).then(function () {
            // here context !== this //context is the same as above but this is Sammy.RenderContext
            // console.log(context);
            // console.log(this);

            //console.log(this.partials);
            context.partials = this.partials;  //may be it is not necessary
            //console.log(context.partials);
            context.title = 'Greet Handlebars';
            context.name = context.params.name;
            this.partial('./templates/greeting.hbs');
        });


    });

    this.get('#/about', (context) => {
        context.swap('<h2>This is about page</h2>');
    });


});

$(() => {
    app.run();
});

// this.get('#/catalog', loadBooks);
// this.post('#/login', userLogin);
// this.put('#/catalog/:bookId', updateBook);
// this.del('#/catalog/:bookId', deleteBook);
