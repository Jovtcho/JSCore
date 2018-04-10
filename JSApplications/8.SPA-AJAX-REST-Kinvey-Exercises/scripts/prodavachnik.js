const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_rkBzIdkjf';
const APP_SECRET = '85409026d1564008a64066ebe3fa16bc';
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)};

function startApp() {
    showHideMenuLinks();
    showView('viewHome');
    attachAllEvents();
}

function showView(viewName) {
    $('main > section').hide();// Hide all views
    $('#' + viewName).show(); // Show the selected view only
}

function showHideMenuLinks() {
    $("#linkHome").show();
    if (sessionStorage.getItem('authToken') === null) { // No logged in user
        $("#linkLogin").show();
        $("#linkRegister").show();
        $("#linkListAds").hide();
        $("#linkCreateAd").hide();
        $("#linkLogout").hide();
        $("#loggedInUser").text('').hide();
    } else { // We have logged in user
        $("#linkLogin").hide();
        $("#linkRegister").hide();
        $("#linkListAds").show();
        $("#linkCreateAd").show();
        $("#linkLogout").show();
        $('#loggedInUser').text("Welcome, " + sessionStorage.getItem('username') + "!").show();
    }
}

function showInfo(message) {
    let infoBox = $('#infoBox');
    infoBox.text(message);
    infoBox.show();
    setTimeout(function () {
        $('#infoBox').fadeOut()
    }, 2000);
}

function showError(errorMsg) {
    let errorBox = $('#errorBox');
    errorBox.text("Error: " + errorMsg);
    errorBox.show();
}

function attachAllEvents() {
    // Bind the navigation menu links
    $("#linkHome").on('click', () => {
        showView('viewHome')
    });
    $("#linkLogin").on('click', () => {
        showView('viewLogin');
        $('#formLogin').trigger('reset');
    });
    $("#linkRegister").on('click', () => {
        showView('viewRegister');
        $('#formRegister').trigger('reset');
    });
    $("#linkListAds").on('click', listAds);
    $("#linkCreateAd").on('click', () => {
        showView('viewCreateAd');
        $('#formCreateAd').trigger('reset');
    });
    $("#linkLogout").on('click', logoutUser);

    // Bind the form submit buttons
    $("#buttonLoginUser").on('click', loginUser);
    $("#buttonRegisterUser").on('click', registerUser);
    $("#buttonCreateAd").on('click', createAd);
    $("#buttonEditAd").on('click', editAd);
    // $("form").on('submit', function (event) {
    //     event.preventDefault()
    // });

    // Bind the info / error boxes
    $("#infoBox, #errorBox").on('click', function () {
        $(this).fadeOut()
    });

    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function () {
            $("#loadingBox").show()
        },
        ajaxStop: function () {
            $("#loadingBox").hide()
        }
    });
}

function loginUser() {
    let username = $('#formLogin input[name="username"]').val();
    let password = $('#formLogin input[name="passwd"]').val();

    if (username === undefined || username === '') {
        showError('Username should not be empty');
        return;
    }

    if (password === undefined || password === '') {
        showError('Password should no be empty');
        return;
    }

    let data = {
        username,
        password
    };

    let loginReq = {
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/login',
        headers: AUTH_HEADERS,
        data: data
    };

    $.ajax(loginReq)
        .then(function (res) {
            signInUser(res, 'Login successful');
        })
        .catch(handleAjaxError)
}

function registerUser() {
    let username = $('#formRegister input[name="username"]').val();
    let password = $('#formRegister input[name="passwd"]').val();

    if (username === undefined || username === '') {
        showError('Username should not be empty');
        return;
    }

    if (password === undefined || password === '') {
        showError('Password should no be empty');
        return;
    }

    let data = {
        username,
        password
    };

    let registerReq = {
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY,
        headers: AUTH_HEADERS,
        data: data
    };

    $.ajax(registerReq)
        .then(function (res) {
            signInUser(res, 'Registration successful');
        })
        .catch(handleAjaxError)
}

function signInUser(res, message) {
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('authToken', res._kmd.authtoken);
    sessionStorage.setItem('userId', res._id);
    showView('viewHome');
    showHideMenuLinks();
    showInfo(message);
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

function signOutUser() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    showHideMenuLinks();
    showView('viewHome');
    showInfo('Logout successful');
}

function listAds() {
    let getAllAdsReq = {
        url: BASE_URL + 'appdata/' + APP_KEY + '/ads',
        headers: {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        }
    };

    $.ajax(getAllAdsReq)
        .then(function (res) {
            showView('viewAds');
            displayAds(res.reverse());
        })
        .catch(handleAjaxError);
}

function displayAds(ads) {
    let adsDiv = $('#ads');
    adsDiv.empty();
    if (ads.length === 0) {
        adsDiv.append('<p>No ads in database</p>');
        return;
    }

    adsDiv.append($('<table>'));
    let adsTable = adsDiv.find('table');
    adsTable.append($('<th>Title</th>'))
        .append($('<th>Description</th>'))
        .append($('<th>Publisher</th>'))
        .append($('<th>Date Published</th>'))
        .append($('<th>Price</th>'))
        .append($('<th>Actions</th>'));

    for (let ad of ads) {
        let tr = $('<tr>');
        tr.append($(`<td>${ad.title}</td>`))
            .append($(`<td>${ad.description}</td>`))
            .append($(`<td>${ad.publisher}</td>`))
            .append($(`<td>${ad.datePublished}</td>`))
            .append($(`<td>${ad.price}</td>`))
            .append($('<td>')
                .append($('<a href="#">[Read more]</a>').on('click', () => {
                    readMore(ad);
                })));

        if (ad.publisher === sessionStorage.getItem('username')) {
            tr.find('td:last-child')
                .append($('<a href="#">[Delete]</a>').on('click', () => {
                    deleteAd(ad);
                }))
                .append($('<a href="#">[Edit]</a>').on('click', () => {
                    loadAdForEdit(ad);
                }));
        }

        adsTable.append(tr);
    }
}

function createAd() {
    let createForm = $('#formCreateAd');
    let title = createForm.find('input[name="title"]').val();
    let description = createForm.find('textarea[name="description"]').val();
    let datePublished = createForm.find('input[name="datePublished"]').val().toString('yyyy-MM-dd');
    let price = Number(createForm.find('input[name="price"]').val());
    let imageUrl = createForm.find('input[name="imageUrl"]').val();
    let publisher = sessionStorage.getItem('username');

    if (title.length === 0) {
        showError('Title cannot be empty');
        return;
    }

    if (price.length === 0) {
        showError('Price cannot be empty');
        return;
    }

    let data = {
        title,
        description,
        publisher,
        datePublished,
        price,
        imageUrl
    };

    let createReq = {
        method: 'POST',
        url: BASE_URL + 'appdata/' + APP_KEY + '/ads',
        headers: {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        },
        data: data
    };

    $.ajax(createReq)
        .then(function () {
            listAds();
            showInfo('Ad created');
        })
        .catch(handleAjaxError)
}

function loadAdForEdit(ad) {
    let editForm = $('#formEditAd');
    editForm.find('input[name="id"]').val(ad._id);
    editForm.find('input[name="publisher"]').val(ad.publisher);
    editForm.find('input[name="title"]').val(ad.title);
    editForm.find('textarea[name="description"]').val(ad.description);
    editForm.find('input[name="datePublished"]').val(ad.datePublished);
    editForm.find('input[name="price"]').val(ad.price);
    editForm.find('input[name="imageUrl"]').val(ad.imageUrl);
    showView('viewEditAd');
}

function editAd() {
    let editForm = $('#formEditAd');
    let id = editForm.find('input[name="id"]').val();
    let publisher = editForm.find('input[name="publisher"]').val();
    let title = editForm.find('input[name="title"]').val();
    let description = editForm.find('textarea[name="description"]').val();
    let datePublished = editForm.find('input[name="datePublished"]').val();
    let price = Number(editForm.find('input[name="price"]').val());
    let imageUrl = editForm.find('input[name="imageUrl"]').val();

    if (title.length === 0) {
        showError('Title cannot be empty');
        return;
    }

    let data = {
        title,
        description,
        publisher,
        datePublished,
        price,
        imageUrl
    };

    let editReq = {
        method: 'PUT',
        url: BASE_URL + 'appdata/' + APP_KEY + '/ads/' + id,
        headers: {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        },
        data: data
    };

    $.ajax(editReq)
        .then(function () {
            listAds();
            showInfo('Ad edited');
        })
        .catch(handleAjaxError)
}

function deleteAd(ad) {
    let deleteReq = {
        method: 'DELETE',
        url: BASE_URL + 'appdata/' + APP_KEY + '/ads/' + ad._id,
        headers: {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        }
    };

    $.ajax(deleteReq)
        .then(function () {
            listAds();
            showInfo('Ad deleted');
        })
        .catch(handleAjaxError)
}
function readMore(ad) {
    let details = $('#divDetailsAd');
    details.empty();
    details.append(`<img src='${ad.imageUrl}' alt="Ad picture" width="100" \>`)
        .append($('<br>'))
        .append($('<label style="font-style: italic">Title:</label>'))
        .append($(`<h1>${ad.title}</h1>`))
        .append($('<label style="font-style: italic">Description:</label>'))
        .append($(`<p>${ad.description}</p>`))
        .append($('<label style="font-style: italic">Publisher:</label>'))
        .append($(`<div>${ad.publisher}</div>`))
        .append($('<label style="font-style: italic">Date:</label>'))
        .append($(`<div>${ad.datePublished}</div>`));
    showView('viewDetailsAd');
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);
    if (response.readyState === 0) {
        errorMsg = "Cannot connect due to network error.";
    }
    if (response.responseJSON && response.responseJSON.description) {
        errorMsg = response.responseJSON.description;
    }
    showError(errorMsg);
}