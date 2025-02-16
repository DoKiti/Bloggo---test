import {posts} from '../data/posts.js';

// Function to get the value of a URL parameter
function getPostIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('postId'); // Get 'postId' parameter value from the URL
}

// Function to find the post by id
function getPostById(postId) {
  return posts.find(post => post.postId === postId); // Finds the post by matching postId
}



function displayPostDetails(post) {
  // Log to ensure elements exist

  const postTitleElement = document.querySelector('.post-title');
  const postTextElement = document.querySelector('.post-texts');
  const postLikesElement = document.querySelector('.likes');
  const postDislikesElement = document.querySelector('.dislikes');
  const postSavesElement = document.querySelector('.saves');
  const postCommentsElement = document.querySelector('.comments');
  const profilePictureElement = document.querySelector('.js-profile-picture')

  // Log to confirm the elements

  // Injecting post data into the page
  postTitleElement.textContent = post.postTitle;
  postTextElement.textContent = post.texts;
  postLikesElement.innerHTML = post.ratings.likes;
  postDislikesElement.innerHTML = post.ratings.dislikes;
  postSavesElement.innerHTML = post.ratings.saves;
  postCommentsElement.innerHTML = post.ratings.comments;
  profilePictureElement.src = post.authorProfilePicture;
}


document.addEventListener('DOMContentLoaded', () => {
  const postId = getPostIdFromUrl(); // Get the postId from the URL
  const post = getPostById(postId); // Find the post by its ID

  if (post) {
    // If the post is found, display its details
    displayPostDetails(post);
  } else {
    // If no post is found with that ID, display an error or a 404 message
    document.querySelector('.main-section').innerHTML = '<p>Post not found!</p>';
  }
});
