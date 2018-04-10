const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_H1q9TD5qM';
const APP_SECRET = '1736bc850c314f5488de429fa8e93092';
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)};
const BOOKS_PER_PAGE = 10;

function loginUser() {
    // POST -> BASE_URL + 'user/' + APP_KEY + '/login'
    // signInUser(res, 'Login successful.')
    let username = $('#formLogin input[name=username]').val();
    let password = $('#formLogin input[name=passwd]').val();

    let loginReq = {
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/login',
        headers: AUTH_HEADERS,
        data: {
            username,
            password
        }
    };

    $.ajax(loginReq)
        .then(function (res) {
            signInUser(res, 'Login successful')
        })
        .catch(handleAjaxError)
}

function registerUser() {
    // POST -> BASE_URL + 'user/' + APP_KEY + '/'
    // signInUser(res, 'Registration successful.')
    let username = $('#formRegister input[name=username]').val();
    let password = $('#formRegister input[name=passwd]').val();

    let registerReq = {
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/',
        headers: AUTH_HEADERS,
        data: {
            username,
            password
        }
    };

    $.ajax(registerReq)
        .then(function (res) {
            signInUser(res, 'Registration successful');
        })
        .catch(handleAjaxError)
}

function listBooks() {
    // GET -> BASE_URL + 'appdata/' + APP_KEY + '/books'
    // displayPaginationAndBooks(res.reverse())
    let listBooksReq = {
        url: BASE_URL + 'appdata/' + APP_KEY + '/books',
        headers: {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        }
    };

    $.ajax(listBooksReq)
        .then(function (res) {
            showView('viewBooks');
            displayPaginationAndBooks(res.reverse())
        })
        .catch(handleAjaxError)
}


function createBook() {
    let title = $('#formCreateBook input[name=title]').val();
    let author = $('#formCreateBook input[name=author]').val();
    let description = $('#formCreateBook textarea[name=description]').val();

    let createBookReq = {
        method: 'POST',
        url: BASE_URL + 'appdata/' + APP_KEY + '/books',
        headers: {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        },
        data: {
            title,
            author,
            description
        }
    };

    $.ajax(createBookReq)
        .then(function (res) {
            listBooks();
            showInfo('Book created');
        })
        .catch(handleAjaxError)

    // POST -> BASE_URL + 'appdata/' + APP_KEY + '/books'
    // showInfo('Book created.')
}

function deleteBook(book) {
    // DELETE -> BASE_URL + 'appdata/' + APP_KEY + '/books/' + book._id
    // showInfo('Book deleted.')
    let deleteBookReq = {
        method: 'DELETE',
        url: BASE_URL + 'appdata/' + APP_KEY + '/books/' + book._id,
        headers: {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        }
    };

    $.ajax(deleteBookReq)
        .then(function () {
            listBooks();
            showInfo('Book deleted');
        })
        .catch(handleAjaxError)
}

function loadBookForEdit(book) {
    let bookId = book._id;
    let title = book.title;
    let author = book.author;
    let description = book.description;

    showView('viewEditBook');
    $('#formEditBook input[name=id]').val(bookId);
    $('#formEditBook input[name=title]').val(title);
    $('#formEditBook input[name=author]').val(author);
    $('#formEditBook textarea[name=description]').val(description);

}

function editBook() {
    // PUT -> BASE_URL + 'appdata/' + APP_KEY + '/books/' + book._id
    // showInfo('Book edited.')
    let bookId = $('#formEditBook input[name=id]').val();
    let title = $('#formEditBook input[name=title]').val();
    let author = $('#formEditBook input[name=author]').val();
    let description = $('#formEditBook textarea[name=description]').val();

    let editReq = {
        method: 'PUT',
        url: BASE_URL + 'appdata/' + APP_KEY + '/books/' + bookId,
        headers: {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        },
        data: {
            title,
            author,
            description
        }
    };

    $.ajax(editReq)
        .then(function () {
            listBooks();
            showInfo('Book edited')
        })
        .catch(handleAjaxError)
}

function saveAuthInSession(userInfo) {
    sessionStorage.setItem('username', userInfo.username);
    sessionStorage.setItem('authToken', userInfo.authToken);
    sessionStorage.setItem('userId', userInfo.userId);
}

function logoutUser() {
    let logoutReq = {
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/_logout',
        headers: {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        }
    };

    $.ajax(logoutReq)
        .then(signOutUser)
        .catch(handleAjaxError)
}

function signInUser(res, message) {
    let userInfo = {
        username: res.username,
        authToken: res._kmd.authtoken,
        userId: res._id
    };

    saveAuthInSession(userInfo);
    showHomeView();
    showHideMenuLinks();
    showInfo(message);
}

function signOutUser() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    //sessionStorage.clear();
    showHomeView();
    showHideMenuLinks();
    showInfo('Logout successful.')
}

function displayPaginationAndBooks(books) {
    let tableBooks = $('#books table');
    let pagination = $('#pagination-demo');
    if (pagination.data("twbs-pagination")) {
        pagination.twbsPagination('destroy');
    }
    pagination.twbsPagination({
        totalPages: Math.ceil(books.length / BOOKS_PER_PAGE),
        visiblePages: 5,
        next: 'Next',
        prev: 'Prev',
        onPageClick: function (event, page) {
            //remove old page books
            tableBooks.find('tr').each((index, elem) => {
                if (index > 0) {
                    $(elem).remove();
                }
            });
            let startBook = (page - 1) * BOOKS_PER_PAGE;
            let endBook = Math.min(startBook + BOOKS_PER_PAGE, books.length);
            $(`a:contains(${page})`).addClass('active');
            for (let i = startBook; i < endBook; i++) {
                //add new page books
                let tableRow = $('<tr>');
                tableRow.append($('<td>').text(books[i].title))
                    .append($('<td>').text(books[i].author))
                    .append($('<td>').text(books[i].description));

                if (books[i]._acl.creator === sessionStorage.getItem('userId')) {
                    tableRow.append($('<td>')
                        .append($('<a href="#">[Edit]</a>').on('click', function () {
                            loadBookForEdit(books[i]);
                        }))
                        .append($('<a href="#">[Delete]</a>').on('click', function () {
                            deleteBook(books[i]);
                        })));
                }

                tableBooks.append(tableRow);
            }
        }
    })
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error.";
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description;
    showError(errorMsg);
}