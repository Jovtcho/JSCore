function getArticleGenerator(articles) {
    let content = $('#content');

    return function () {
        if (articles.length > 0) {
            let article = $('<article>')
                .append($('<p>')
                    .text(articles.shift()));
            content.append(article);
        }
    }
}


function getArticleGenerator2(articles) {
    let content = $('#content');
    let counter = 0;

    return function () {
        if (articles.length > counter) {
            let article = $('<article>')
                .append($('<p>')
                    .text(articles[counter++]));
            content.append(article);
        }
    }
}