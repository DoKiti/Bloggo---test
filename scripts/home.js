import { posts } from "../data/posts.js";
import { users } from "../data/users.js";

export function displayAllPosts() {
  let postsHTML = "";

  posts.forEach((postDetails) => {
    postsHTML += `
            <div class="post-container-preview">
                <div class="top-of-post-preview">
                      <div class="js-user-directory directory profile-picture-and-author-name-preview" data-user-directory-id="${postDetails.author.userId}">
                          <img class="author-profile-picture-preview" src="${postDetails.authorProfilePicture}">
                          <p class="author-name">
                              ${postDetails.author.nickname} 
                          </p>
                      </div>

                    <div class="post-setting">
                        <img class="post-setting-icon" src="images/icons/3-dots.png">
                        <div class="options-menu">
                            <a href="#" id="save-option">Save for later</a>
                            <a href="#" id="hide-option">Hide</a>
                            <a href="#" id="report-option">Report</a>
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
}


displayAllPosts();  // Calling the function to display the posts



  // Add the event listener for the button
  document.querySelectorAll('.js-post-directory')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const postId = button.dataset.postDirectoryId;
      window.location.href = `post.html?postId=${postId}`;
  })
  })

    // Add the event listener for the button
    document.querySelectorAll('.js-user-directory')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const userId = button.dataset.userDirectoryId;
        window.location.href = `profile.html?userId=${userId}`;
    })
    })