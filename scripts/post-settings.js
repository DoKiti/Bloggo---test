import { posts } from "../data/posts.js";
import { deletePost } from "./post-settings/delete-post.js";
import { checkHasItNotBeenSaved, savePost, unsavePost } from "./post-settings/save.js";


export function postSetting() {
  document.querySelectorAll('.post-setting').forEach((postSettingElement) => {
    const postSettingButton = postSettingElement.querySelector('.post-setting-icon');
    const optionsMenu = postSettingElement.querySelector('.js-options-menu');
    const postId = postSettingElement.dataset.postSettingId; // Use postSettingElement to get the correct postId
    const postObj = posts.find((post) => post.postId === postId)

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
      if(checkHasItNotBeenSaved(postId)) {
        alert(`Save for later clicked for Post ID: ${postId}`); // DELETING LATER
        savePost(postId)
        document.getElementById(`save-option-${postId}`)
          .innerHTML = 'Unsave Post'
        document.querySelector(`.js-save-image-${postId}`).src = 'images/icons/on-page-saved.png';
      } else {
        alert(`Unsave post clicked for Post ID: ${postId}`); // DELETING LATER
        unsavePost(postId)
        document.getElementById(`save-option-${postId}`)
          .innerHTML = 'Save for later'
        document.querySelector(`.js-save-image-${postId}`).src = 'images/icons/non-page-saved.png';
      }
      document.querySelector(`.js-saves-count-${postId}`).innerHTML = postObj.ratings.saves
      optionsMenu.style.display = 'none'; // Close the menu after action
    });



    document.getElementById(`delete-option-${postId}`).addEventListener('click', function() {
      alert(`Delete clicked for Post ID: ${postId}`);
      deletePost(postId);
      optionsMenu.style.display = 'none'; // Close the menu after action
    });

    document.getElementById(`report-option-${postId}`).addEventListener('click', function() {
      alert(`Report clicked for Post ID: ${postId}`);
      reportPostDirectory(postId);
      optionsMenu.style.display = 'none'; // Close the menu after action
    });
  });
}


function reportPostDirectory(postId) {
  window.location.href = `report-post.html?postId=${postId}`;
}