import { posts } from "../data/posts.js";
import { postSetting } from "./post-settings.js";
import { displayAllPosts } from "./utils/return-all-posts-HTML.js";
import { addEventListenerForPostPreviewLinks } from "./utils/event-listeners-links-for-post-previews.js";
import { scrollToTop } from "./utils/scroll-to-top-button.js";

if(document.querySelector(".js-home-button-in-home")) {
  document.querySelector(".js-home-button-in-home")
  .addEventListener('click', () => {
    scrollToTop();
  });
}


let postsHTML = await displayAllPosts(posts);  // Calling the function to display the posts

document.querySelector('.js-home-section')
.innerHTML = postsHTML;
addEventListenerForPostPreviewLinks();
postSetting()