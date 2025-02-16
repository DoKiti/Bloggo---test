import {users} from '../data/users.js';

// Function to get the value of a URL parameter
function getUserIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('userId'); // Get 'postId' parameter value from the URL
}

// Function to find the post by id
function getUserById(userId) {
  return users.find(user => user.userId === userId); // Finds the post by matching postId
}


function displayUserDetails(user) {
  console.log('yey')
  // Log to ensure elements exist

  const profilePictureElement = document.querySelector('.js-profile-picture');

  // Injecting post data into the page
  profilePictureElement.src = user.profilePicture
}


document.addEventListener('DOMContentLoaded', () => {
  const userId = getUserIdFromUrl(); // Get the postId from the URL
  const user = getUserById(userId); // Find the post by its ID

  if (user) {
    // If the post is found, display its details
    displayUserDetails(user);
  } else {
    // If no post is found with that ID, display an error or a 404 message
    document.querySelector('.main-container').innerHTML = '<p>Post not found!</p>';
  }
});