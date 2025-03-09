import { posts } from "../data/posts.js";
import { user } from "../data/user.js";
import { deletePost } from "./post-settings/delete-post.js";
import { savedStuff } from "./posts.js/saves-post.js";


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

    // SAVED Opt
    document.getElementById(`save-option-${postId}`).addEventListener('click', function() {
      savedStuff(postId)
      optionsMenu.style.display = 'none'; // Close the menu after action
    });


    // DEL Opt
    document.getElementById(`delete-option-${postId}`).addEventListener('click', function() {
      alert(`Delete clicked for Post ID: ${postId}`);
      deletePost(postId);
      optionsMenu.style.display = 'none'; // Close the menu after action
    });

    // REPORT OPT
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