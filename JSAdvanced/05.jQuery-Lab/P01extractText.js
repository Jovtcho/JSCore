function extractText() {
    // let listItems = $('li');
    // let output = [];
    // for (let item of listItems) {
    //     output.push(item.textContent);
    // }
    //
    // let result = $('#result');
    // result.text(output.join(', '));

    // let output = [];
    // $('ul#items li').each((index, element) => output.push(element.textContent));
    // $('#result').text(output.join(', '));

    let items = $("ul#items li")
        .toArray()
        .map(li => li.textContent)
        .join(", ");
    $("#result").text(items);
}