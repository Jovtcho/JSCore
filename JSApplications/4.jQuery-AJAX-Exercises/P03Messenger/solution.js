function attachEvents() {
    let url = 'https://starmessenger3.firebaseio.com/.json';
    let refreshBtn = $('#refresh');
    refreshBtn.on('click', getAllMessages);
    let submitBtn = $('#submit');
    submitBtn.on('click', submitMessage);
    let messages = [];

    function getAllMessages() {
        let req = {
            method: 'GET',
            url: url,
            success: onSuccess,
            error: onError
        };

        $.ajax(req);
    }

    function onSuccess(res) {
        messages.length = 0;
        for (let id in res) {
            messages.push(res[id]);
        }

        displayMessages();
    }

    function onError(err) {
        console.log(err);
    }

    function displayMessages() {
        messages.sort((a, b) => a.timestamp - b.timestamp);
        let textarea = $('#messages');

        let textareaText = '';
        for (let message of messages) {
            let currentMessage = `${message.author}: ${message.content}`;
            textareaText += `${currentMessage}\n`;
        }
        textarea.text(textareaText.trim());
    }

    function submitMessage() {
        let author = $('#author');
        let content = $('#content');
        let timestamp = Number(Date.now());

        if (author.val() !== '' && content.val() !== '') {
            let data = {
                author: author.val(),
                content: content.val(),
                timestamp: timestamp
            };

            let req = {
                method: 'POST',
                url: url,
                data: JSON.stringify(data),
                success: () => {
                    messages.push(data);
                    displayMessages();
                },
                error: onError
            };

            $.ajax(req);

            content.val('');
        }

    }
}