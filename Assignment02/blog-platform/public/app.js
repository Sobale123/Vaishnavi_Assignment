document.addEventListener("DOMContentLoaded", () => {
    loadPosts();

    document.getElementById("submitBtn").addEventListener("click", () => {
        const postId = document.getElementById("postId").value;
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;

        if (postId) {
            updatePost(postId, title, content);
        } else {
            createPost(title, content);
        }

        clearForm();
    });
});

function loadPosts() {
    fetch("/posts")
        .then(response => response.json())
        .then(data => displayPosts(data));
}

function displayPosts(posts) {
    const postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";
    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="editPost(${post.id})">Edit</button>
            <button onclick="deletePost(${post.id})">Delete</button>
        `;

        postsDiv.appendChild(postDiv);
    });
}

function createPost(title, content) {
    fetch("/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
    }).then(() => loadPosts());
}

function updatePost(id, title, content) {
    fetch(`/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
    }).then(() => loadPosts());
}

function deletePost(id) {
    fetch(`/posts/${id}`, {
        method: "DELETE",
    }).then(() => loadPosts());
}

function editPost(id) {
    fetch(`/posts/${id}`)
        .then(response => response.json())
        .then(post => {
            document.getElementById("postId").value = post.id;
            document.getElementById("title").value = post.title;
            document.getElementById("content").value = post.content;
        });
}

function clearForm() {
    document.getElementById("postId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}
