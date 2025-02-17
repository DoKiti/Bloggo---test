import { getUserById, getUserIdFromUrl } from "./utils/getting-user-from-URL.js";
import { displayAccesories, displayAllUserPosts } from "./profile-summary/profile-posts.js";
import { displayUserDetails } from "./profile-summary/profile.js";
import { addEventListenerForPostPreviewLinks } from "./utils/event-listeners-links-for-post-previews.js";


document.addEventListener('DOMContentLoaded', () => {
  const userId = getUserIdFromUrl(); // Get the postId from the URL
  const user = getUserById(userId); // Find the post by its ID

  if (user) {
    // If the post is found, display its details
    displayUserDetails(user);
    displayAccesories(user);
    displayAllUserPosts(user);
    addEventListenerForPostPreviewLinks();
  } else {
    // If no post is found with that ID, display an error or a 404 message
    document.querySelector('.main-section').innerHTML = '<p>Post not found!</p>';
  }
});

