import { posts } from "../../data/posts.js";
import { users } from "../../data/users.js";


const windowLocation = window.location.href;

export function postSetting() {
  document.querySelectorAll('.post-setting').forEach((postSettingElement) => {
    const postSettingButton = postSettingElement.querySelector('.post-setting-icon');
    const optionsMenu = postSettingElement.querySelector('.js-options-menu');
    const postId = postSettingElement.dataset.postSettingId; // Use postSettingElement to get the correct postId

    // Toggle the display of the options menu on button click
    postSettingButton.addEventListener('click', function(event) {
      event.stopPropagation();

      // Toggle visibility
      if (optionsMenu.style.display === 'block' || optionsMenu.style.display === '') {
        optionsMenu.style.display = 'none';
      } else {
        optionsMenu.style.display = 'block';
      }
    });

    // Close the options menu if clicked outside of it
    document.addEventListener('click', function(event) {
      if (!postSettingElement.contains(event.target)) {
        optionsMenu.style.display = 'none';
      }
    });

    // Option actions
    document.getElementById(`save-option-${postId}`).addEventListener('click', function() {
      alert(`Save for later clicked for Post ID: ${postId}`);
      optionsMenu.style.display = 'none'; // Close the menu after action
    });

    document.getElementById(`delete-option-${postId}`).addEventListener('click', function() {
      alert(`Delete clicked for Post ID: ${postId}`);
      deletePost(postId);
      optionsMenu.style.display = 'none'; // Close the menu after action
    });

    document.getElementById(`report-option-${postId}`).addEventListener('click', function() {
      alert(`Report clicked for Post ID: ${postId}`);
      optionsMenu.style.display = 'none'; // Close the menu after action
    });
  });
}


function deletePost(postId) {
  // Filter out the post with the given postId from the posts array
  const updatedPosts = posts.filter(postObject => postObject.postId !== postId);

  // Update the users' postIds by removing the postId
  const updatedUsers = users.map((userObject) => {
    // Ensure the user has postIds and filter out the postId
    if (userObject.postsIds && Array.isArray(userObject.postsIds)) {
      // Reassign filtered postIds
      userObject.postsIds = userObject.postsIds.filter((userPostId) => userPostId !== postId);
    }
    return userObject; // Return the modified userObject
  });

  // Save the updated posts and users to localStorage
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // Optionally, redirect to refresh the page or re-render the updated posts list
  window.location.href = windowLocation;  // Or use displayAllPosts() if you want to re-render the UI.
}
