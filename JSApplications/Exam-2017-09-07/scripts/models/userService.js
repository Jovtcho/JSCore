let userService = (() => {
    function getAllUsers() {
        return requester.get('user', '', 'Kinvey');
    }

    function followUser(user, subscriptions) {
        //let newSubs = subscriptions.slice(0);
        subscriptions.push(user);

        return requester.update('user', sessionStorage.getItem('userId'), 'Kinvey', {subscriptions: subscriptions});
    }

    function unfollowUser(user, subscriptions) {
        subscriptions = subscriptions.filter(u => u !== user);

        return requester.update('user', sessionStorage.getItem('userId'), 'Kinvey', {subscriptions: subscriptions});
    }

    return {
        getAllUsers,
        followUser,
        unfollowUser
    }
})();