import { posts } from "../data/posts.js";
import { displayAllPosts } from "./utils/display-all-posts.js";
import { scrollToTop } from "./utils/scroll-to-top-button.js";

if(document.querySelector(".js-home-button-in-home")) {
  document.querySelector(".js-home-button-in-home")
  .addEventListener('click', () => {
    scrollToTop();
  });
}


displayAllPosts(posts);  // Calling the function to display the posts