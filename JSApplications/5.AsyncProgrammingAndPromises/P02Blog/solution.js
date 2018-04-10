function attachEvents() {
    $('#btnLoadPosts').on('click', loadPosts);
    $('#btnViewPost').on('click', viewPost);
    let posts = $('#posts');
    const URL = 'https://baas.kinvey.com/appdata/kid_rJFi92M5G';
    const USER = 'Peter';
    const PASSWORD = 'peter';

    function loadPosts() {
        let req = {
            method: 'GET',
            url: `${URL}/posts`,
            headers: {
                'Authorization': make_base_auth()
            }
        };

        $.ajax(req)
            .then(displayPosts)
            .catch(onError);
    }

    function viewPost() {
        let selectedPost = posts.find('option:selected');
        let selectedPostId = selectedPost.val();
        let reqPost = {
            method: 'GET',
            url: `${URL}/posts/${selectedPostId}`,
            headers: {
                'Authorization': make_base_auth()
            }
        };

        let reqComments = {
            method: 'GET',
            url: `${URL}/comments/?query={"post_id":"${selectedPostId}"}`,
            headers: {
                'Authorization': make_base_auth()
            }
        };

        Promise.all([$.ajax(reqPost), $.ajax(reqComments)])
            .then(displayComments)
            .catch(onError);
    }

    function displayPosts(res) {
        posts.empty();
        for (let post of res) {
            let option = $('<option>');
            option.val(post._id);
            option.text(post.title);
            posts.append(option);
        }
    }

    function displayComments([post, comments]) {
        $('#post-title').text(post.title);
        $('#post-body').text(post.body);
        let commentsList = $('#post-comments');
        commentsList.empty();
        for (let comment of comments) {
            let item = $('<li>');
            item.text(comment.text);
            commentsList.append(item);
        }
    }

    function onError(err) {
        let errorDiv = $('<div>');
        errorDiv.text(`Error: ${err.status} (${err.statusText})`);
        $(document.body).prepend(errorDiv);
        setTimeout(function () {
            $(errorDiv).fadeOut(function () {
                $(errorDiv).remove();
            });
        }, 3000);
    }

    function make_base_auth() {
        let token = USER + ':' + PASSWORD;
        let encoded = btoa(token);
        return "Basic " + encoded;
    }
}