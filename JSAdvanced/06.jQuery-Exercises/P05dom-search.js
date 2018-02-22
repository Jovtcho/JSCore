function domSearch(selector, isCaseSensitive) {
    let container = $(selector);
    container.addClass('items-control');
    appendDivAddControl();
    appendDivSearchControl();
    appendDivResult();

    function appendDivAddControl() {
        let addControl = $('<div>').addClass('add-controls');
        addControl
            .append($('<label>')
                .text('Enter text: ')
                .append($('<input>')))
            .append($('<a>')
                .text('Add')
                .addClass('button')
                .css('display', 'inline-block')
                .on('click', addItem));
        addControl.appendTo(container);
    }

    function appendDivSearchControl() {
        let searchControl = $('<div>').addClass('search-controls');
        searchControl
            .append($('<label>')
                .text('Search: ')
                .append($('<input>')
                    .on('input', filterItems)));
        searchControl.appendTo(container);
    }

    function appendDivResult() {
        let result = $('<div>').addClass('result-controls');
        result
            .append($('<ul>')
                .addClass('items-list'));
        result.appendTo(container);
    }

    function addItem() {
        let listItemValue = $(this).parent().find('input').val();
        let listItem = $('<li>').addClass('list-item');
        listItem.append($('<a>')
            .addClass('button')
            .text('X')
            .on('click', deleteItem))
            .append($('<strong>')
                .text(listItemValue))
            .appendTo($('ul.items-list'));
        $(this).parent().find('input').val('');
    }

    function deleteItem() {
        $(this).parent().remove();
    }

    function filterItems() {
        let searchedItem = $(this).parent().find('input').val();
        if (isCaseSensitive) {
            $('li.list-item strong:not(:contains("' + searchedItem + '"))').parent().css('display', 'none');
            // $('li.list-item strong')
            //     .toArray()
            //     .filter(item => item.textContent.indexOf(queryStr) === -1)
            //     .forEach(item => item.parentNode.style.display = "none");
        } else {
            $('li.list-item strong')
                .toArray()
                .filter(item => item.textContent.toLowerCase().indexOf(searchedItem.toLowerCase()) === -1)
                .forEach(item => item.parentNode.style.display = 'none');
        }
    }
}