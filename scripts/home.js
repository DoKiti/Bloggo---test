import { posts } from "../data/posts.js";
import { users } from "../data/users.js";
import { addEventListenerForPostPreviewLinks } from "./utils/event-listeners-links-for-post-previews.js";
import { postSetting } from "./utils/post-settings.js";

export function displayAllPosts() {
  let postsHTML = "";

  posts.forEach((postDetails) => {
    postsHTML += `
            <div class="post-container-preview">
                <div class="top-of-post-preview">
                      <div class="js-user-directory directory profile-picture-and-author-name-preview" data-user-directory-id="${postDetails.author.userId}">
                          <img class="author-profile-picture-preview" src="${postDetails.author.profilePicture}">
                          <p class="author-name">
                              ${postDetails.author.nickname} 
                          </p>
                      </div>

                  <div class="post-setting" data-post-setting-id="${postDetails.postId}">
                    <img class="post-setting-icon" src="../images/icons/3-dots.png">
                    <div class="options-menu js-options-menu">
                        <p role="button" id="delete-option-${postDetails.postId}">Delete</p>
                        <p role="button" id="save-option-${postDetails.postId}" class="save-post-button">Save for later</p>
                        <p role="button" id="report-option-${postDetails.postId}">Report</p>
                    </div>
                  </div>
                </div>

                <div class="directory js-post-directory" data-post-directory-id="${postDetails.postId}">
                  <div class="post-title-container-preview">
                      <p class="post-title-preview">
                          ${postDetails.postTitle}
                      </p>
                  </div>
                  <div class="main-part-of-the-post-preview">
                      <p class="post-preview-text">
                          ${postDetails.texts}
                      </p>
                  </div>
                </div>
                <div class="post-preview-ratings">
                    <a class="direct-to-post" href="post.html">
                        <div class="white-space"></div>
                    </a>
                    <div class="liked-container">
                        <img src="images/icons/like-button.png">
                        <p>
                            ${postDetails.ratings.likes}
                        </p>
                    </div>
                    <div class="disliked-container">
                        <img src="images/icons/dislike-button.png">
                        <p>
                            ${postDetails.ratings.dislikes}
                        </p>
                    </div>
                    <div class="saved-container">
                        <img src="images/icons/saved.png">
                        <p>
                            ${postDetails.ratings.saves} <!-- Fixed to 'saves' instead of 'saved' -->
                        </p>
                    </div>
                    <div class="comments-container">
                      <img src="images/icons/comments.png">
                      <p>
                            ${postDetails.ratings.comments}
                      </p>
                  </div>
                </div>
            </div>`;
  });
  document.querySelector('.js-home-section')
    .innerHTML = postsHTML;
    
  addEventListenerForPostPreviewLinks();
  
  postSetting()
}

displayAllPosts();  // Calling the function to display the posts