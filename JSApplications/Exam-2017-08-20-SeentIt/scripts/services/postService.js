let postService = (() => {
    function getAllPosts() {
        let endpoint = 'posts?query={}&sort={"_kmd.ect": -1}';

        return requester.get('appdata', endpoint, 'Kinvey');
    }

    function createPost(author, title, description, url, imageUrl) {
        let data = {
            author, title, description, url, imageUrl
        };

        return requester.post('appdata', 'posts', 'Kinvey', data);
    }

    function editPost(postId, author, title, description, url, imageUrl) {
        let endpoint = `posts/${postId}`;
        let data = {
            author, title, description, url, imageUrl
        };

        return requester.update('appdata', endpoint, 'Kinvey', data);
    }

    function deletePost(postId) {
        let endpoint = `posts/${postId}`;

        return requester.remove('appdata', endpoint, 'Kinvey');
    }

    function getMyPosts(username) {
        let endpoint = `posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`;

        return requester.get('appdata', endpoint, 'Kinvey');
    }

    function getPostById(postId) {
        let endpoint = `posts/${postId}`;

        return requester.get('appdata', endpoint, 'Kinvey');
    }

    return {
        getAllPosts,
        createPost,
        editPost,
        deletePost,
        getMyPosts,
        getPostById
    }

})();
