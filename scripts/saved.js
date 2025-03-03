import { posts } from '../data/posts.js';
import {users} from '../data/users.js';
import { displayAllPosts } from './utils/return-all-posts-HTML.js';
import { addEventListenerForPostPreviewLinks } from "./utils/event-listeners-links-for-post-previews.js";
import { scrollToTop } from "./utils/scroll-to-top-button.js";
import { postSetting } from "./post-settings.js";

const savedPosts = users[0].savedPostsIds.map((savedPostId) => {
  return posts.find((post) => post.postId === savedPostId);
});

if(document.querySelector(".js-saved-button-in-saved")) {
  document.querySelector(".js-saved-button-in-saved")
  .addEventListener('click', () => {
    scrollToTop();
  });
}

const savedPostsHTML = await displayAllPosts(savedPosts);
document.querySelector('.js-saved-section')
  .innerHTML = savedPostsHTML

addEventListenerForPostPreviewLinks();
postSetting()