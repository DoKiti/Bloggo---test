import { getUserById, getUserIdFromUrl } from "./utils/getting-user-from-URL.js";
import { displayAccesories, displayAllUserPosts } from "./profile-summary/profile-posts.js";
import { displayUserDetails } from "./profile-summary/profile.js";
import { displayError } from "./displayError.js";
import { backButtonDirectory } from "./utils/back-button-href.js";
import { followButton } from "./profile-summary/follow-button.js";

backButtonDirectory()

document.addEventListener('DOMContentLoaded', async () => {
  const userId = getUserIdFromUrl(); // Get the postId from the URL
  const user = getUserById(userId); // Find the post by its ID

  if (user) {
    // If the post is found, display its details]
    await displayUserDetails(user);
    displayAccesories(user);
    displayAllUserPosts(user);
    followButton(userId)
  } else {
    // If no post is found with that ID, display an error or a 404 message
    displayError()
  }
});