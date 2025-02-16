import { displayAllPosts } from "../data/posts.js";

displayAllPosts();  // Calling the function to display the posts



  // Add the event listener for the button
  document.querySelectorAll('.js-post-directory')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const postId = button.dataset.postDirectoryId;
      window.location.href = `post.html?postId=${postId}`;
  })
  })
