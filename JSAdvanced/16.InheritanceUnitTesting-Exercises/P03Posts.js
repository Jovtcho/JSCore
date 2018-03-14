function solve() {
    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        toString() {
            return `Post: ${this.title}\nContent: ${this.content}`;
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = Number(likes);
            this.dislikes = Number(dislikes);
            this.comments = [];
        }

        addComment(comment) {
            this.comments.push(comment);
        }

        toString() {
            let output = super.toString();
            output += `\nRating: ${this.likes - this.dislikes}`;
            if (this.comments.length > 0) {
                output += '\nComments:\n';
                output += this.comments.map(c => ` * ${c}`).join('\n');
            }
            return output;
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = Number(views);
        }

        view() {
            this.views++;
            // Returns the object for chaining
            return this;
        }

        toString() {
            return super.toString() + `\nViews: ${this.views}`;
        }
    }

    return {
        Post,
        SocialMediaPost,
        BlogPost
    }
}


let Post = solve().Post;
let post = new Post("Post", "Content");
console.log(post.toString());
// Post: Post
// Content: Content
console.log('=====================');

let SocialMediaPost = solve().SocialMediaPost;
let scm = new SocialMediaPost("TestTitle", "TestContent", 25, 30);
scm.addComment("Good post");
scm.addComment("Very good post");
scm.addComment("Wow!");
console.log(scm.toString());
// Post: TestTitle
// Content: TestContent
// Rating: -5
// Comments:
//  * Good post
//  * Very good post
//  * Wow!
console.log('=====================');

let BlogPost = solve().BlogPost;
let bp = new BlogPost("BlogPost", "BlogPostContent", 3);
bp.view();
bp.view();
console.log(bp.view().view().view());
console.log(bp.toString());