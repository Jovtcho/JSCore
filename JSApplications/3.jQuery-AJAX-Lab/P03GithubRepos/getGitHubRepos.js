function loadRepos() {
    let container = $('#repos');
    container.empty();
    let user = $('#username').val();
    let url = `https://api.github.com/users/${user}/repos`;
    $.ajax({
        method: 'GET',
        url: url,
        success: onSuccess,
        error: onError
    });

    function onSuccess(res) {
        for (let repo of res) {
            let li = $('<li>');
            let anchor = $('<a>').text(repo.full_name);
            anchor.attr('href', repo.html_url);
            li.append(anchor);
            container.append(li);
        }
    }

    function onError(err) {
        container.append($('<li>').text(`Error: User ${user} ${err.statusText}`));
        console.log(err);
    }
}