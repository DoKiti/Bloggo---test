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

const sortedSavedPosts = savedPosts.sort((a, b) => { 
  // Parse the timestamps from postId and compare them
  const timestampA = parseInt(a.postId.split('-')[0], 10);
  const timestampB = parseInt(b.postId.split('-')[0], 10);
  
  return timestampB - timestampA;
});

const savedPostsHTML = await displayAllPosts(sortedSavedPosts);
document.querySelector('.js-saved-section')
  .innerHTML = savedPostsHTML

addEventListenerForPostPreviewLinks();
postSetting()