handlers.getEditorView = async function (ctx) {
    try {
        const userId = sessionStorage.getItem('userId');
        let [ receipt ] = await receiptService.getActiveReceipt(userId);

        if (!receipt) {
            receipt = await receiptService.createReceipt();
        }

        let products = await entriesService.getEntriesByReceiptId(receipt._id);
        if (products.length > 0) {
            products.forEach(p => {
                p.subtotal = (p.price * p.quantity).toFixed(2);
            });

            ctx.total = products
                .map(p => +p.subtotal)
                .reduce((a,b) => a + b);
            ctx.items = products.length;
            ctx.products = products;
        } else {
            ctx.items = 0;
            ctx.total = 0.00;
        }

        ctx.username = sessionStorage.getItem('username');
        ctx.isAuth = auth.isAuth();
        ctx.receiptId = receipt._id;
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            addProductForm: './templates/forms/addProductForm.hbs',
            checkoutForm: './templates/forms/checkoutForm.hbs',
            productTr: './templates/editor/productTr.hbs'
        }).then(function () {
            this.partial('./templates/editor/editorPage.hbs');
        });

    } catch (reason) {
        notify.handleError(reason);
    }
};
handlers.createProduct = function (ctx) {
  let type = ctx.params.type;
  let quantity = Number(ctx.params.qty);
  let price = Number(ctx.params.price);
  let receiptId = ctx.params.receiptId;

  if (type === "") {
      notify.showError('Type must be non-empty!');
  } else if (isNaN(quantity)) {
      notify.showError('Quantity must be a number!');
  } else if (isNaN(price)) {
      notify.showError('Price must be a number!');
  } else {
      entriesService.createEntry(type, quantity, price, receiptId)
          .then(() => {
              notify.showInfo('Product created!');
              ctx.redirect('#/editor');
          })
          .catch(notify.handleError);
  }
};
handlers.deleteProduct = function (ctx) {
    let productId = ctx.params.productId;

    entriesService.deleteEntry(productId)
        .then(() => {
            notify.showInfo('Product deleted!');
            ctx.redirect('#/editor');
        })
        .catch(notify.showError);
};
handlers.checkout = function (ctx) {
    let receiptId = ctx.params.receiptId;
    let items = ctx.params.items;
    let total = ctx.params.total;

    receiptService.commitReceipt(receiptId, items, total)
        .then(() => {
            notify.showInfo('Receipt committed!');
            ctx.redirect('#/editor');
        })
        .catch(notify.handleError);
};