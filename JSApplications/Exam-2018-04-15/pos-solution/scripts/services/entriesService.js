let entriesService = (() => {

    function getEntriesByReceiptId(receiptId) {
        const endpoint = `entries?query={"receiptId":"${receiptId}"}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }
    
    function createEntry(type, quantity, price, receiptId) {
        const endpoint = 'entries';
        let data = { type, quantity, price, receiptId };
        
        return remote.post('appdata', endpoint, 'kinvey', data);
    }
    
    function deleteEntry(entryId) {
        const endpoint = `entries/${entryId}`;

        return remote.remove('appdata', endpoint, 'kinvey');
    }


    return {
        getEntriesByReceiptId,
        createEntry,
        deleteEntry
    }
})();