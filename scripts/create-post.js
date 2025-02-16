// Function to display posts on the page
function displayPosts() {
  
}

function createPosts() {
  const postContainer = document.getElementById('postContainer');
  const posts = JSON.parse(localStorage.getItem('posts')) || []; // Get posts from localStorage

  postContainer.innerHTML = ''; // Clear the container

  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.textContent = post.content;
    postContainer.appendChild(postElement);
  });
}

// Enable or disable the "Create Post" button
document.getElementById('postContent').addEventListener('input', function() {
  const content = document.getElementById('postContent').value;
  const createPostBtn = document.getElementById('createPostBtn');
  createPostBtn.disabled = content.trim() === ''; // Enable button if content is non-empty
});

// Handle post creation
document.getElementById('createPostBtn').addEventListener('click', function() {
  const content = document.getElementById('postContent').value;

  if (content.trim() !== '') {
    const newPost = { content: content };

    // Get posts from localStorage or use an empty array if none exist
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Add the new post to the array
    posts.push(newPost);

    // Save posts back to localStorage
    localStorage.setItem('posts', JSON.stringify(posts));

    // Clear the textarea and disable the button
    document.getElementById('postContent').value = '';
    document.getElementById('createPostBtn').disabled = true;

    // Display the updated posts
    displayPosts();
  }
});

// Initial display of posts when the page loads
window.onload = function() {
  displayPosts();
};