import {posts} from '../data/posts.js';
import { user } from '../data/user.js';
import { displayError } from './displayError.js';
import { checkHasItNotBeenSaved } from './post-settings/save-post-setting.js';
import { checkDisliked, checkLiked, clickedLikesDislikes } from './posts.js/like-dislike.js';
import { clickedSaved } from './posts.js/saves-post.js';
import { backButtonDirectory } from './utils/back-button-href.js';
import { displayingRatingsText } from './utils/display-ratings-text.js';

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
  document.querySelector(".js-post-section")
    .innerHTML = `              
          <div class="profile-picture-and-post-title-container">
            <div class="profile-picture-and-post-title">
                <a class="js-back-button">
                  <img class="back-button-image" src="images/icons/back-icon.png">
                </a>
                <a href="profile.html?userId=${post.author.userId}">
                  <img class="js-profile-picture author-profile-picture" src="${post.author.profilePicture}">
                </a>
                <p class="post-title">
                  ${post.postTitle}
                </p>
              </div>
          </div>

          <div class="main-part-of-the-post">
            <p class="post-texts">
              ${post.texts}
            </p>
            
            <div class="post-preview-ratings post-ratings js-post-ratings">
              <div class="liked-container" data-liked-container-post-id="${post.postId}">
                  <img class="js-like-image-${post.postId}" src="${checkLiked(user, post.postId) ? 'images/icons/clicked-like.png' : 'images/icons/like-button.png'}">
                  <p class="js-likes-count-${post.postId}" data-likes="${post.ratings.likes}">
                      ${displayingRatingsText(post.ratings.likes)}
                  </p>
              </div>
              <div class="disliked-container" data-disliked-container-post-id="${post.postId}">
                  <img class="js-dislike-image-${post.postId}" src="${checkDisliked(user, post.postId) ? 'images/icons/clicked-dislike.png' : 'images/icons/dislike-button.png'}">
                  <p class="js-dislikes-count-${post.postId}" data-dislikes="${post.ratings.dislikes}">
                      ${displayingRatingsText(post.ratings.dislikes)}
                  </p>
              </div>
              <div class="saved-container" data-saved-container-post-id="${post.postId}">
                  <img class="js-save-image-${post.postId}" src="${checkHasItNotBeenSaved(post.postId) ? 'images/icons/non-page-saved.png' : 'images/icons/on-page-saved.png'}">
                  <p class="js-saves-count-${post.postId}" data-saves="${post.ratings.saves}">
                      ${displayingRatingsText(post.ratings.saves)}
                  </p>
              </div>
              <div class="comments-container">
                <img src="images/icons/comments.png">
                <p class="comments">
                  ${displayingRatingsText(post.ratings.comments)}    
                </p>
            </div>
          </div>`        
}


document.addEventListener('DOMContentLoaded', async () => {
  const postId = getPostIdFromUrl(); // Get the postId from the URL
  const post = getPostById(postId); // Find the post by its ID

  if (post) {
    // If the post is found then

    // update title with the post's title
    document.querySelector('title').innerHTML = `${post.postTitle} - Bloggo`; 

    // display its details
    await displayPostDetails(post);
    
    console.log(document.querySelector(`.js-saves-count-${postId}`).innerHTML)
    

    backButtonDirectory()
    clickedLikesDislikes();
    clickedSaved()

  } else {
    // If no post is found with that ID, display an error or a 404 message
    displayError()
  }
});