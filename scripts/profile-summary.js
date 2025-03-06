import { getUserById, getUserIdFromUrl } from "./utils/getting-user-from-URL.js";
import { displayAccesories, displayAllUserPosts } from "./profile-summary/profile-posts.js";
import { displayUserDetails } from "./profile-summary/profile.js";
import { displayError } from "./displayError.js";
import { backButtonDirectory, whiteSpaceReload } from "./utils/back-button-href.js";
import { followButton, checkFollowButton } from "./profile-summary/follow-button.js";
import { renderUserFollowers } from "./profile-summary/user-followers.js";
import { renderUserFollowings } from "./profile-summary/user-followings.js";

backButtonDirectory()

document.addEventListener('DOMContentLoaded', async () => {
  const userId = getUserIdFromUrl(); // Get the postId from the URL
  const user = getUserById(userId); // Find the post by its ID

  if (user) {
    // If the post is found, display its details]
    await displayUserDetails(user);
    await checkFollowButton(userId)
    displayAccesories(user);
    displayAllUserPosts(user);
    followButton(userId);

    document.querySelector('.js-user-followers-count').addEventListener('click', () => {
      document.querySelector(".user-followings-followers-container-everything").style.display = 'flex';
      document.querySelector('body').style.overflowY = 'hidden';
      document.querySelector('.everything-of-body').classList.add('shadowed-background');

      renderUserFollowers(user);
      
      whiteSpaceReload();
    })

  
    document.querySelector('.js-user-followings-count').addEventListener('click', () => {
      document.querySelector(".user-followings-followers-container-everything").style.display = 'flex';
      document.querySelector('body').style.overflowY = 'hidden';
      document.querySelector('.everything-of-body').classList.add('shadowed-background');

      renderUserFollowings(user);
      
      whiteSpaceReload();
    })

  } else {
    // If no post is found with that ID, display an error or a 404 message
    displayError()
  }
});