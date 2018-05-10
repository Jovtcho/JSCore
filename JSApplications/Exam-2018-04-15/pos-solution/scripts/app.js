const handlers = {};

$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', handlers.getWelcomeView);
        this.get('#/welcome', handlers.getWelcomeView);
        this.post('#/register', handlers.registerUser);
        this.post('#/login', handlers.loginUser);
        this.get('#/logout', handlers.logoutUser);
        this.get('#/editor', handlers.getEditorView);
        this.post('#/product/create', handlers.createProduct);
        this.get('#/product/delete/:productId', handlers.deleteProduct);
        this.post('#/checkout', handlers.checkout);
        this.get('#/receipts', handlers.getCashierReceipts);
        this.get('#/receipt/details/:receiptId', handlers.getReceiptDetails);
    });

    app.run();
});