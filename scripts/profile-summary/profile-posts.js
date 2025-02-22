import {posts} from "../../data/posts.js";


export function displayAccesories(user) {
  document.querySelector(".js-latest-post-text-container")
    .innerHTML = `
                <p>
                    Latest posts from ${user.nickname}
                </p>
                `
}

export function displayAllUserPosts(user) {
  let userPostsElement = ""; // Declare userPostsElement as let, not const

  user.postsIds.forEach((postId) => {
    const postObject = posts.find(post => post.postId === postId);
    userPostsElement += `
            <div class="post-container-preview">
                <div class="top-of-post-preview">
                      <div class="js-user-directory directory profile-picture-and-author-name-preview" data-user-directory-id="${postObject.author.userId}">
                          <img class="author-profile-picture-preview" src="${postObject.author.profilePicture}">
                          <p class="author-name">
                              ${postObject.author.nickname} 
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
                <div class="directory js-post-directory" data-post-directory-id="${postObject.postId}">
                  <div class="post-title-container-preview">
                      <p class="post-title-preview">
                          ${postObject.postTitle}
                      </p>
                  </div>
                  <div class="main-part-of-the-post-preview">
                      <p class="post-preview-text">
                          ${postObject.texts}
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
                            ${postObject.ratings.likes}
                        </p>
                    </div>
                    <div class="disliked-container">
                        <img src="images/icons/dislike-button.png">
                        <p>
                            ${postObject.ratings.dislikes}
                        </p>
                    </div>
                    <div class="saved-container">
                        <img src="images/icons/saved.png">
                        <p>
                            ${postObject.ratings.saves} 
                        </p>
                    </div>
                    <div class="comments-container">
                      <img src="images/icons/comments.png">
                      <p>
                            ${postObject.ratings.comments}
                      </p>
                  </div>
                </div>
            </div>
    `;
  });

    document.querySelector(".js-user-posts")
      .innerHTML = userPostsElement;
}