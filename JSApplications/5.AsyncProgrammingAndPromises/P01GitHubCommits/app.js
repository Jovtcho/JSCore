function loadCommits() {
    let url = 'https://api.github.com/repos';
    //"<username>/<repository>/commits"
    let username = $('#username').val();
    let repo = $('#repo').val();
    let commits = $('#commits');

    let req = {
        method: 'GET',
        url: `${url}/${username}/${repo}/commits`,
    };

    $.ajax(req)
        .then(displayCommits)
        .catch(onError);

    function displayCommits(res) {
        commits.empty();
        for (let obj of res) {
            let item = $('<li>');
            item.text(`${obj.commit.author.name}: ${obj.commit.message}`);
            commits.append(item);
        }
    }

    function onError(err) {
        commits.empty();
        let item = $('<li>');
        item.text(`Error: ${err.status} (${err.statusText})`);
        commits.append(item);
    }
}