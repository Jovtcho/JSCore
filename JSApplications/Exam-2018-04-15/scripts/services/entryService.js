let entryService = (() => {
    function getEntriesByReceiptId(receiptId) {
        //https://baas.kinvey.com/appdata/app_key/entries?query={"receiptId":"receiptId"}
        return requester.get('appdata', `entries?query={"receiptId":"${receiptId}"}`);
    }

    function addEntry(entry) {
        //https://baas.kinvey.com/appdata/app_key/entries
        return requester.post('appdata', 'entries', 'Kinvey', entry);
    }

    function deleteEntry(entryId) {
        //https://baas.kinvey.com/appdata/app_key/entries/entry_id
        return requester.remove('appdata', `entries/${entryId}`, 'Kinvey');
    }

    return {
        getEntriesByReceiptId,
        addEntry,
        deleteEntry
    }
})();