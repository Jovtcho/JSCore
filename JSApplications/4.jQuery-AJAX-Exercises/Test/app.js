function solution() {
    let url = 'https://baas.kinvey.com/appdata/kid_Hy2z2iaYz/posts';
    let submitBtn = $('#submit');
    submitBtn.on('click', sendAuth);

    function sendAuth() {
        let user = $('#user').val();
        let pass = $('#pass').val();
        if (user !== '' && pass !== '') {
            let req = {
                method: 'GET',
                url: url,
                headers: {
                    "Authorization": make_base_auth(user, pass)
                    //"Basic " + btoa(user + ":" + pass)
                },
                success: onSuccess,
                error: onError
            };

            $.ajax(req);
        }
    }

    function onSuccess(res) {
        console.log(res);
        let container = $('#posts');
        for (let post of res) {
            let item = $('<li>');
            item.text(`Body: ${post.body} | Title: ${post.title}`);
            //console.log(post);
            container.append(item);
        }
    }

    function onError(err) {
        alert(err.statusText);
    }

    function make_base_auth(user, password) {
        let token = user + ':' + password;
        let hash = btoa(token);
        return "Basic " + hash;
    }
}