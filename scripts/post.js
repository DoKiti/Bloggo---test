import {posts} from '../data/posts.js';

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
                <a href="blog.html">
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
            
            <div class="post-preview-ratings post-ratings">
              <div class="liked-container">
                  <img src="images/icons/like-button.png">
                  <p class="likes">
                    ${post.ratings.likes} 
                  </p>
              </div>
              <div class="disliked-container">
                  <img src="images/icons/dislike-button.png">
                  <p class="dislikes">
                    ${post.ratings.dislikes} 
                  </p>
              </div>
              <div class="saved-container">
                  <img src="images/icons/saved.png">
                  <p class="saves">
                    ${post.ratings.saves} 
                  </p>
              </div>
              <div class="comments-container">
                <img src="images/icons/comments.png">
                <p class="comments">
                  ${post.ratings.comments}    
                </p>
            </div>
          </div>`
        
}


document.addEventListener('DOMContentLoaded', () => {
  const postId = getPostIdFromUrl(); // Get the postId from the URL
  const post = getPostById(postId); // Find the post by its ID

  if (post) {
    // If the post is found, display its details
    displayPostDetails(post);


  } else {
    // If no post is found with that ID, display an error or a 404 message
    document.querySelector('.main-section').innerHTML = '<p>Post not found!</p>';
  }
});



