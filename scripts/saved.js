import { posts } from '../data/posts.js';
import {savedPostsIds} from '../data/saves.js';
import { displayAllPosts } from './utils/display-all-posts.js';
import { scrollToTop } from "./utils/scroll-to-top-button.js";

const savedPosts = savedPostsIds.map((savedPostsDetails) => {
  return posts.find((post) => post.postId === savedPostsDetails.postId)
})

if(document.querySelector(".js-saved-button-in-saved")) {
  document.querySelector(".js-saved-button-in-saved")
  .addEventListener('click', () => {
    scrollToTop();
  });
}

displayAllPosts(savedPosts);