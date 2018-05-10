let chirpService = (() => {

    function getChirpsFromSubscriptions(subscriptions) {
        let endpoint = `chirps?query={"author":{"$in": ${subscriptions}}}&sort={"_kmd.ect": 1}`;

        return requester.get('appdata', endpoint, 'Kinvey');
    }

    function getUserChirps(username) {
        let endpoint = `chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`;

        return requester.get('appdata', endpoint, 'Kinvey');
    }

    function getFollowing(username) {
        let endpoint = `?query={"username":"${username}"}`;

        return requester.get('user', endpoint, 'Kinvey');
    }

    function getFollowers(username) {
        let endpoint = `?query={"subscriptions":"${username}"}`;

        return requester.get('user', endpoint, 'Kinvey');
    }

    function createChirp(data) {
        return requester.post('appdata', 'chirps', 'Kinvey', data);
    }

    return {
        getChirpsFromSubscriptions,
        getUserChirps,
        getFollowing,
        getFollowers,
        createChirp
    }
})();