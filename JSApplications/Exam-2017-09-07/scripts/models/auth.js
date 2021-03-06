let auth = (() => {
    let loading = 0;
    $(document).on({
        ajaxStart: function () {
            if (loading === 0) {
                $("#loadingBox").show();
            }
            loading++;
        },
        ajaxStop: function () {
            loading--;
            if (loading === 0) {
                $("#loadingBox").hide();
            }
        }
    });

    $("#infoBox, #errorBox").on('click', function () {
        $(this).fadeOut()
    });

    function isAuth() {
        return sessionStorage.getItem('authtoken') !== null;
    }

    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
        let subscriptions = JSON.stringify(userInfo.subscriptions);
        sessionStorage.setItem('subscriptions', subscriptions);
    }

    function clearSession() {
        sessionStorage.removeItem('authtoken');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('subscriptions');
    }

    // user/login
    function login(username, password) {
        let userData = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', userData);
    }

    // user/register
    function register(username, password) {
        let userData = {
            username,
            password,
        };

        return requester.post('user', '', 'basic', userData);
    }

    // user/logout
    function logout() {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return requester.post('user', '_logout', 'kinvey', logoutData);
    }

    function handleError(response) {
        //showError(response.responseJSON.description);
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0) {
            errorMsg = "Cannot connect due to network error.";
        }
        if (response.responseJSON && response.responseJSON.description) {
            errorMsg = response.responseJSON.description;
        }
        showError(errorMsg);
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.find('span').text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.find('span').text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }

    return {
        isAuth,
        login,
        register,
        logout,
        saveSession,
        clearSession,
        showInfo,
        showError,
        handleError
    }
})();