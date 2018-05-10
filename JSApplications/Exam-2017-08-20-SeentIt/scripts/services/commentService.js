let commentService = (() => {
    function getAllCommentsByPost(postId) {
        let endpoint = `comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`;

        return requester.get('appdata', endpoint, 'Kinvey');
    }

    function createComment(postId, author, content) {
        let data = {
            postId, author, content
        };

        return requester.post('appdata', 'comments', 'Kinvey', data);
    }

    function deleteComment(commentId) {
        let endpoint = `comments/${commentId}`;

        return requester.remove('appdata', endpoint, 'Kinvey');
    }

    return {
        getAllCommentsByPost,
        createComment,
        deleteComment
    }
})();

