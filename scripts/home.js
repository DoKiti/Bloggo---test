import { posts } from "../data/posts.js";
import { postSetting } from "./post-settings.js";
import { displayAllPosts } from "./utils/return-all-posts-HTML.js";
import { addEventListenerForPostPreviewLinks } from "./utils/event-listeners-links-for-post-previews.js";
import { scrollToTop } from "./utils/scroll-to-top-button.js";
import { clickedLikesDislikes } from "./posts/like-dislike.js";
import { clickedSaved } from "./posts/saves-post.js";

if(document.querySelector(".js-home-button-in-home")) {
  document.querySelector(".js-home-button-in-home")
  .addEventListener('click', () => {
    scrollToTop();
  });
}

const sortedPosts = posts.sort((a, b) => { 
  // Parse the timestamps from postId and compare them
  const timestampA = parseInt(a.postId.split('-')[0], 10);
  const timestampB = parseInt(b.postId.split('-')[0], 10);
  
  return timestampB - timestampA;
});

let postsHTML = await displayAllPosts(sortedPosts);  // Calling the function to display the posts

document.querySelector('.js-home-section')
.innerHTML = postsHTML;

addEventListenerForPostPreviewLinks();
postSetting();
clickedLikesDislikes();
clickedSaved()