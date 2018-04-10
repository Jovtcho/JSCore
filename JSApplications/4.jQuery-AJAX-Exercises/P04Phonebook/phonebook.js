function attachEvents() {
    let phonebookUrl = 'https://phonebook-nakov.firebaseio.com/phonebook';
    let loadBtn = $('#btnLoad');
    loadBtn.on('click', loadPhonebook);
    let createBtn = $('#btnCreate');
    createBtn.on('click', createContact);
    let phonebook = $('#phonebook');

    function loadPhonebook() {
        let url = phonebookUrl + '.json';
        $.ajax({
            method: 'GET',
            url: url,
            success: displayContacts,
            error: onError
        });
    }

    function displayContacts(res) {
        phonebook.empty();
        for (let key in res) {
            let listItem = $('<li>');
            listItem.text(`${res[key].person}: ${res[key].phone} `);
            let deleteBtn = $('<button>').text('[Delete]');
            deleteBtn.attr('href', '#');
            deleteBtn.on('click', deleteContact.bind(this, key));
            listItem.append(deleteBtn);
            phonebook.append(listItem);
        }
    }

    function onError(err) {
        phonebook.append($('<li>').text(`Error`));
    }

    function createContact() {
        let person = $('#person');
        let phone = $('#phone');
        let url = phonebookUrl + '.json';
        let data = JSON.stringify({
            person: person.val(),
            phone: phone.val()
        });

        $.ajax({
            method: 'POST',
            url: url,
            data: data,
            success: loadPhonebook,
            error: onError
        });

        person.val('');
        phone.val('');
    }

    function deleteContact(key) {
        let deleteRequest = {
            method: 'DELETE',
            url: phonebookUrl + '/' + key + '.json',
            success: loadPhonebook,
            error: onError
        };
        $.ajax(deleteRequest);
    }
}