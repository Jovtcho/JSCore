let auth = (() => {
    function isAuth() {
        return sessionStorage.getItem('authToken') !== null;
    }

    function saveSession(userData) {
        sessionStorage.setItem('authToken', userData._kmd.authtoken);
        sessionStorage.setItem('username', userData.username);
        sessionStorage.setItem('userId', userData._id);
    }

    function clearSession() {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userId');
    }

    function register(username, password) {
        let obj = {username, password};
        return requestor.post('user', '', 'basic', obj);
    }

    function login(username, password) {
        let obj = {username, password};
        return requestor.post('user', 'login', 'basic', obj)
    }

    function logout() {
        return requestor.post('user', '_logout', 'kinvey');
    }

    return {
        isAuth,
        login,
        logout,
        register,
        saveSession,
        clearSession
    }
})();