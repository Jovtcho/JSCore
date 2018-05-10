handlers.getCashierReceipts = async function (ctx) {
    const userId = sessionStorage.getItem('userId');
    try {
        ctx.receipts = await receiptService.getMyReceipts(userId);
        ctx.isAuth = auth.isAuth();
        ctx.username = sessionStorage.getItem('username');
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            receipt: './templates/receipt/receipt.hbs'
        }).then(function () {
            this.partial('./templates/receipt/allReceiptsPage.hbs');
        })
    } catch (reason) {
        notify.handleError(reason);
    }

};
handlers.getReceiptDetails = async function (ctx) {
    const receiptId = ctx.params.receiptId;
    try {
        let receipt = await receiptService.getReceiptById(receiptId);
        let products = await entriesService.getEntriesByReceiptId(receiptId);
        products.forEach(p => {
           p.subtotal = (p.price * p.quantity).toFixed(2);
        });

        ctx.isAuth = auth.isAuth();
        ctx.username = sessionStorage.getItem('username');
        ctx.total = receipt.total;
        ctx.products = products;
        console.log(ctx);
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            productTr: './templates/receipt/productTr.hbs'
        }).then(function () {
            this.partial('./templates/receipt/receiptDetailsPage.hbs');
        })
    } catch (reason) {
        notify.handleError(reason);
    }

};