let receiptService = (() => {

    function getActiveReceipt(userId) {
        const endpoint = `receipts?query={"_acl.creator":"${userId}","active":"true"}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function createReceipt() {
        const endpoint = 'receipts';
        let data = { active: true };

        return remote.post('appdata', endpoint, 'kinvey', data);
    }

    function getMyReceipts(userId) {
        const endpoint = `receipts?query={"_acl.creator":"${userId}","active":"false"}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function getReceiptById(receiptId) {
        const endpoint = `receipts/${receiptId}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    async function commitReceipt(receiptId, items, total) {
        const endpoint = `receipts/${receiptId}`;
        let oldReceipt = await getReceiptById(receiptId);
        oldReceipt['items'] = items;
        oldReceipt['total'] = total;
        oldReceipt['active'] = false;

        return remote.update('appdata', endpoint, 'kinvey', oldReceipt);
    }

    return {
        getActiveReceipt,
        createReceipt,
        getMyReceipts,
        getReceiptById,
        commitReceipt
    }
})();