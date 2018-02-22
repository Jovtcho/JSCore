function wikiParser(selector) {
    let text = $(selector).text();
    console.log(text);

    text = text.replace(/'''(.+?)'''/g, '<b>\$1</b>');
    text = text.replace(/''(.+?)''/g, '<i>\$1</i>');
    text = text.replace(/===(.+?)===/g, '<h3>\$1</h3>');
    text = text.replace(/==(.+?)==/g, '<h2>\$1</h2>');
    text = text.replace(/=(.+?)=/g, '<h1>\$1</h1>');
    text = text.replace(/\[\[([^\[\]]+?)\|(.+?)\]\]/g, '<a href="/wiki/' + '\$1' + '">' + '\$2' + '</a>');
    text = text.replace(/\[\[([^\[\]]+?)\]\]/g, '<a href="/wiki/' + '\$1' + '">' + '\$1' + '</a>');
    console.log(text);

    $(selector).html(text);
}