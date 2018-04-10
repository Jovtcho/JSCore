function loadRepos() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let container = $('#res');
            container.text(request.responseText);
        }
    };


    request.open('GET', 'https://api.github.com/users/testnakov/repos', true);
    request.send();
}