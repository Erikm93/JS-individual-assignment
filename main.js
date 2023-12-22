let postListElement = document.getElementById("posts-list");
let initialPosts = []; // Array for initial posts
let newPosts = []; // Array for new posts

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

        let tagsContent = post.tags.map(tag => "#" + tag + ", ").join('');

        tags.innerText = tagsContent.slice(0, -2);
        
        article.append(title, body, tags);
        li.append(article);

        postListElement.append(li);
    }
}

fetchPosts(function (posts) {
    renderPosts(posts, postListElement);
});


let addPostBtn = document.getElementById("add-post-btn");
let newTitleInput = document.getElementById("title");
let newBodyInput = document.getElementById("body");
let newTagsInput = document.getElementById("tags");

addPostBtn.addEventListener("click", function () {
    let newTitle = newTitleInput.value;
    let newBody = newBodyInput.value;
    let newTags = newTagsInput.value.split(",").map(tag => tag.trim());

    if (!newTitle || newTitle.trim() === "") {
        alert("Title required to make a new post");
        return;
    }

    let newPost = {
        title: newTitle,
        body: newBody,
        tags: newTags,
    };

    // Adds the new post to the array
    newPosts.unshift(newPost); 

    // Clears the input and textarea
    newTitleInput.value = "";
    newBodyInput.value = "";
    newTagsInput.value = "";

    // Combine initialPosts and newPosts
    renderPosts([...newPosts, ...initialPosts], postListElement);
});
