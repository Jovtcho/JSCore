let receiptService = (() => {
    function getActiveReceipt() {
        let userId = sessionStorage.getItem('userId');
        //https://baas.kinvey.com/appdata/app_key/receipts?query={"_acl.creator":"userId","active":"true"}
        return requester.get('appdata', `receipts?query={"_acl.creator":"${userId}","active":"true"}`, 'Kinvey');
    }

    function createReceipt() {
        let data = {
            active: true
        };

        return requester.post('appdata', 'receipts', 'Kinvey', data);
    }

    function getMyReceipts() {
        let userId = sessionStorage.getItem('userId');
        //https://baas.kinvey.com/appdata/app_key/receipts?query={"_acl.creator":"userId","active":"false"}
        return requester.get('appdata', `receipts?query={"_acl.creator":"${userId}","active":"false"}`, 'Kinvey');
    }

    function getReceiptDetails(receiptId) {
        //https://baas.kinvey.com/appdata/app_key/receipts/receipt_id
        return requester.get('appdata', `receipts/${receiptId}`, 'Kinvey');
    }

    function commitReceipt(receiptId) {
        let data = {
            active: false
        };
        //https://baas.kinvey.com/appdata/app_key/receipts/receipt_id
        return requester.update('appdata', `receipts/${receiptId}`, 'Kinvey', data);
    }

    return {
        getActiveReceipt,
        createReceipt,
        getMyReceipts,
        getReceiptDetails,
        commitReceipt
    }
})();