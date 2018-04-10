class Book {
    constructor(title, author, isbn, tags) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.tags = tags
    }
}

function attachEvents() {
    const USER = 'Pesho';
    const PASSWORD = '123';
    const ENDPOINT = 'https://baas.kinvey.com/appdata/kid_HkQ7jrKqG/books';

    let addForm = $('#addForm');
    addForm.find('button.add').on('click', addBook);
    $('#aside button.load').on('click', loadBooks);
    let books = $('#books');

    function addBook() {
        let title = addForm.find('input.title').val();
        let author = addForm.find('input.author').val();
        let isbn = addForm.find('input.isbn').val();
        let tags = addForm.find('input.tags').val().split(' ');
        let book = new Book(title, author, isbn, tags);
        let addReq = {
            method: 'POST',
            url: ENDPOINT,
            data: JSON.stringify(book),
            headers: {
                'Authorization': make_base_auth(),
                'Content-Type': 'application/json'
            }
        };

        $.ajax(addReq)
            .then(addData)
            .catch(displayError)
    }

    function addData(res) {
        addForm.find('input.title').val('');
        addForm.find('input.author').val('');
        addForm.find('input.isbn').val('');
        addForm.find('input.tags').val('');
        loadBooks();
    }

    function loadBooks() {
        let loadReq = {
            url: ENDPOINT,
            headers: {
                Authorization: make_base_auth()
            }
        };

        $.ajax(loadReq)
            .then(displayBooks)
            .catch(displayError)
    }

    function displayBooks(booksData) {
        books.empty();
        for (let book of booksData) {
            let id = book._id;
            let title = book.title;
            let author = book.author;
            let isbn = book.isbn;
            let tags = book.tags;

            let bookToAdd = $(`<div class="book" data-id="${id}">
            <label>Title</label>
            <input type="text" class="title" value="${title}"/>
            <label>Author</label>
            <input type="text" class="author" value="${author}"/>
            <label>ISBN</label>
            <input type="text" class="isbn" value="${isbn}"/>
            <label>Tags</label>
            <input type="text" class="tags" value="${tags}"/></div>`);
            let updateBtn = $('<button class="update">Update</button>');
            updateBtn.on('click', () => updateBook(bookToAdd, id));
            let deleteBtn = $('<button class="delete">Delete</button>');
            deleteBtn.on('click', () => deleteBook(bookToAdd, id));
            bookToAdd.append(updateBtn);
            bookToAdd.append(deleteBtn);

            books.append(bookToAdd);
        }
    }

    function deleteBook(book, id) {
        let deleteReq = {
            method: 'DELETE',
            url: `${ENDPOINT}/${id}`,
            headers: {
                Authorization: make_base_auth()
            }
        };

        $.ajax(deleteReq)
            .catch(displayError);

        $(book).remove();
    }

    function updateBook(book, id) {
        let title = book.find('input.title').val();
        let author = book.find('input.author').val();
        let isbn = book.find('input.isbn').val();
        let tags = book.find('input.tags').val().split(' ');

        let bookToEdit = new Book(title, author, isbn, tags);

        let putReq = {
            method: 'PUT',
            url: `${ENDPOINT}/${id}`,
            data: JSON.stringify(bookToEdit),
            headers: {
                Authorization: make_base_auth(),
                'Content-Type': 'application/json'
            }
        };

        $.ajax(putReq)
            .then(loadBooks)
            .catch(displayError)
    }

    function displayError(err) {
        console.log(err);
    }

    function make_base_auth() {
        let token = USER + ':' + PASSWORD;
        let encoded = btoa(token);
        return "Basic " + encoded;
    }
}

