function createBook(selector, title, author, isbn) {
    let bookGenerator = (function () {
        let id = 1;
        return function (selector, title, author, isbn) {
            let container = $(selector);
            let bookContainer = $('<div></div>');
            bookContainer.attr('id', `book${id}`);
            bookContainer.css('border', 'none');
            $('<p>').text(`${title}`).addClass('title').appendTo(bookContainer);
            $(`<p>${author}</p>`).addClass('author').appendTo(bookContainer);
            $(`<p class="isbn">${isbn}</p>`).appendTo(bookContainer);
            let selectBtn = $('<button></button>').text("Select");
            selectBtn.on('click', () => bookContainer.css('border', '2px solid blue'));
            selectBtn.appendTo(bookContainer);
            let deselectBtn = $('<button>Deselect</button>');
            deselectBtn.on('click', () => bookContainer.css('border', 'none'));
            deselectBtn.appendTo(bookContainer);

            bookContainer.appendTo(container);
            id++;
        }
    }());

    bookGenerator(selector, title, author, isbn);
    bookGenerator(selector, title, author, isbn);
    bookGenerator(selector, title, author, isbn);
}



