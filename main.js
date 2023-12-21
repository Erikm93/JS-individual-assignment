let postListElement = document.getElementById("posts-list");
let initialPosts = []; // Array for initial posts

function fetchPosts(callback) {
    fetch('https://dummyjson.com/posts')
        .then(res => res.json())
        .then(function (json) {
            initialPosts = json.posts; // Save initial posts
            callback(initialPosts);
        });
}

function renderPosts(posts, postListElement) {
    postListElement.innerText = "";

    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];

        let li = document.createElement("li");
        let article = document.createElement("article");
        article.classList.add("post");


        let title = document.createElement("h1");
        let body = document.createElement("div");
        let tags = document.createElement("span");

        title.innerText = post.title;
        body.innerText = post.body;
        tags.innerText = post.tags;
        
        article.append(title, body, tags);
        li.append(article);

        postListElement.append(li);
    }
}

fetchPosts(function (posts) {
    renderPosts(posts, postListElement);
});

