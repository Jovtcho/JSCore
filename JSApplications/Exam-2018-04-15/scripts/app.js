$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', displayHome);
        this.get('#/welcome', displayHome);

        //Register page logic
        this.post('#/register', function (ctx) {
            let username = ctx.params['username-register'];
            let password = ctx.params['password-register'];
            let repeatPassword = ctx.params['password-register-check'];

            if (!/^[A-Za-z]{5,}$/.test(username)) {
                auth.showError('A username should be a string with at least 5 characters long.');
            } else if (password === '' || repeatPassword === '') {
                auth.showError('Passwords input fields should not be empty.');
            } else if (password !== repeatPassword) {
                auth.showError('Both passwords should match.');
            } else {
                auth.register(username, password)
                    .then(function (userData) {
                        auth.saveSession(userData);
                        auth.showInfo('User registration successful.');
                        ctx.redirect('#/home');
                    })
                    .catch(auth.handleError);
            }
        });

        //Login page logic
        this.post('#/login', function (ctx) {
            let username = ctx.params['username-login'];
            let password = ctx.params['password-login'];

            if (!/^[A-Za-z]{5,}$/.test(username)) {
                auth.showError('A username should be a string with at least 5 characters long.');
            } else if (password === '') {
                auth.showError('Passwords input fields should not be empty.');
            } else {
                auth.login(username, password)
                    .then(function (userData) {
                        auth.saveSession(userData);
                        auth.showInfo('Login successful.');
                        ctx.redirect('#/home');
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
                    ctx.redirect('#/welcome');
                })
                .catch(auth.handleError);
        });

        //Home page after login/register
        this.get('#/home', async function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }

            let username = sessionStorage.getItem('username');
            ctx.username = username;
            let receiptId;

            await receiptService.getActiveReceipt()
                .then(async function (receipts) {
                    if (receipts.length === 0) {
                        await receiptService.createReceipt()
                            .then(function (createdReceipt) {
                                //console.log(createdReceipt);
                                receiptId = createdReceipt._id;
                            })
                            .catch(auth.handleError)
                    } else {
                        receiptId = receipts[0]._id;

                        await entryService.getEntriesByReceiptId(receiptId)
                            .then(function (entries) {
                                //console.log(entries);
                                let total = 0;
                                for (let entry of entries) {
                                    let subtotal = Number(entry.price) * Number(entry.qty);
                                    entry['subTotal'] = subtotal;
                                    total += subtotal;
                                    entry.isFromCreate = true;
                                }
                                ctx.total = total;
                                ctx.entries = entries;
                            })
                            .catch(auth.handleError)
                    }

                    sessionStorage.setItem('receiptId', receiptId);
                })
                .catch(auth.handleError);

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                entry: './templates/entries/entry.hbs',
                addEntryForm: './templates/entries/addEntryForm.hbs',
                checkoutForm: './templates/receipts/checkoutForm.hbs'
            }).then(function (data1, data2) {
                this.partial('./templates/home.hbs');
                //Attach custom events to HTML elements
                this.trigger('qtyChange');
                this.trigger('priceChange');
            });


        });

        //Add entry
        this.post('#/addEntry', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }

            let type = ctx.params.type;
            let qty = ctx.params.qty;
            let price = ctx.params.price;

            if (type.length === 0 || qty.length === 0 || price.length === 0) {
                auth.showError('Any of the fields can not be empty.');
                return;
            }

            qty = Number(qty);
            price = Number(price);

            if (isNaN(qty)) {
                auth.showError('Quantity should be a number.');
                return;
            }

            if (isNaN(price)) {
                auth.showError('Price should be a number.');
                return;
            }

            let data = {
                type: type,
                qty: qty,
                price: price,
                receiptId: sessionStorage.getItem('receiptId')
            };


            entryService.addEntry(data)
                .then(function (entry) {
                    auth.showInfo('Entry added to current receipt.');
                    ctx.redirect('#/home');
                })
                .catch(auth.handleError);
        });

        //Delete entry
        this.get('#/delete/:entryId', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }

            let entryId = ctx.params.entryId;

            requester.remove('appdata', `entries/${entryId}`, 'Kinvey')
                .then(function () {
                    auth.showInfo('Entry deleted.');
                    ctx.redirect('#/home');
                })
                .catch(auth.handleError);
        });

        //Checkout receipt
        this.post('#/checkout', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }

            let receiptId = sessionStorage.getItem('receiptId');
            receiptService.commitReceipt(receiptId)
                .then(function () {
                    auth.showInfo('Current receipt checked out.');
                    ctx.redirect('#/home');
                })
                .catch(auth.handleError)

        });

        //Show all archived receipts
        this.get('#/overview', async function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }

            let username = sessionStorage.getItem('username');
            ctx.username = username;

            await receiptService.getMyReceipts()
                .then(async function (receipts) {
                    for (let receipt of receipts) {
                        let creationDate = getCreationDate(receipt._kmd.ect);
                        receipt.creationDate = creationDate;

                        await entryService.getEntriesByReceiptId(receipt._id)
                            .then(function (entries) {
                                let total = 0;
                                for (let entry of entries) {
                                    let subtotal = Number(entry.price) * Number(entry.qty);
                                    total += subtotal;
                                }

                                receipt.total = total;
                                receipt.productCount = entries.length;
                            })
                            .catch(auth.handleError);
                    }

                    ctx.receipts = receipts;
                })
                .catch(auth.handleError);

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                receipt: './templates/receipts/receipt.hbs',
            }).then(function () {
                this.partial('./templates/receipts/allReceipts.hbs');
            });

        });

        //Show all entries by receiptId
        this.get('#/details/:receiptId', async function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }

            let receiptId = ctx.params.receiptId;
            let username = sessionStorage.getItem('username');
            ctx.username = username;

            await entryService.getEntriesByReceiptId(receiptId)
                .then(function (entries) {
                    let total = 0;
                    for (let entry of entries) {
                        let subTotal = Number(entry.price) * Number(entry.qty);
                        total += subTotal;
                        entry.subTotal = subTotal;
                    }

                    ctx.total = total;
                    ctx.entries = entries;
                })
                .catch(auth.handleError);


            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                entry: './templates/entries/entry.hbs',
            }).then(function () {
                this.partial('./templates/receipts/receiptDetails.hbs');
            });
        });

        //Custom event for quantity checking and update subtotal and total in real time
        this.bind('qtyChange', function (e, data) {
            let addEntry = $('#create-entry-form');
            let qtyInput = addEntry.find('input[name=qty]');

            let totalDiv = $('#create-receipt-form').find('div[data-attr=entriesTotal]');
            let entries = $('.row').find('div[data-attr=entrySubtotal]');
            let total = 0;
            for (let entry of entries) {
                total += Number($(entry).text());
            }

            qtyInput.on('keyup', function () {
                let subtotalDiv = addEntry.find('div[data-attr=subtotal]');
                let price = addEntry.find('input[name=price]').val();
                let qty = qtyInput.val();

                if (isNaN(qty)) {
                    auth.showError('Quantity should be a number.');
                    return;
                }

                if (price.length === 0) {
                    price = 1;
                }

                let subtotal = Number(qty) * Number(price);
                subtotalDiv.text(subtotal);
                totalDiv.text(total + subtotal);
            });
        });

        //Custom event for price checking and update subtotal and total in real time
        this.bind('priceChange', function (e, data) {
            let addEntry = $('#create-entry-form');
            let priceInput = addEntry.find('input[name=price]');

            let totalDiv = $('#create-receipt-form').find('div[data-attr=entriesTotal]');
            let entries = $('.row').find('div[data-attr=entrySubtotal]');
            let total = 0;
            for (let entry of entries) {
                total += Number($(entry).text());
            }

            priceInput.on('keyup', function () {
                let subtotalDiv = addEntry.find('div[data-attr=subtotal]');
                let qty = addEntry.find('input[name=qty]').val();
                let price = priceInput.val();

                if (isNaN(price)) {
                    auth.showError('Price should be a number.');
                    return;
                }

                if (qty.length === 0) {
                    qty = 1;
                }

                let subtotal = Number(qty) * Number(price);
                subtotalDiv.text(subtotal);
                totalDiv.text(total + subtotal);
            });
        });

        //Display index page
        function displayHome(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                welcomeText: './templates/common/welcomeText.hbs',
                loginForm: './templates/forms/loginForm.hbs',
                registerForm: './templates/forms/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/welcome.hbs');
            })
        }

        function getCreationDate(dateIsoFormat) {
            let date = new Date(dateIsoFormat);
            let year = (date.getFullYear());
            let month = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1);
            let day = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
            let hours = (date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours());
            let minutes = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());

            return `${year}-${month}-${day} ${hours}:${minutes}`;
        }
    });

    app.run();
});