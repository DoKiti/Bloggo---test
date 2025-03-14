import { posts } from '../data/posts.js';
import {users} from '../data/users.js';
import { displayAllPosts } from './utils/return-all-posts-HTML.js';
import { addEventListenerForPostPreviewLinks } from "./utils/event-listeners-links-for-post-previews.js";
import { scrollToTop } from "./utils/scroll-to-top-button.js";
import { postSetting } from "./post-settings.js";
import { clickedLikesDislikes } from './posts/like-dislike.js';
import { clickedSaved } from './posts/saves-post.js';


let followingsPostsArray = [];

users[0].followingsIds.forEach((followingsId) => {
  // Check if the user exists
  const followingUserObj = users.find((u) => u.userId === followingsId);
  
  if (!followingUserObj) {
    console.error(`User with userId ${followingsId} not found`);
    return; // Skip to the next iteration if the user doesn't exist
  }

  if (!followingUserObj.postsIds || followingUserObj.postsIds.length === 0) {
    console.warn(`No posts found for user with userId ${followingsId}`);
    return; // Skip to the next iteration if the user has no posts
  }

  followingUserObj.postsIds.forEach((followingUserPostId) => {
    // Check if the post exists
    const postObj = posts.find((post) => post.postId === followingUserPostId);
    
    if (!postObj) {
      console.error(`Post with postId ${followingUserPostId} not found for user ${followingsId}`);
      return; // Skip to the next post if the post doesn't exist
    }

    followingsPostsArray.push(postObj);
  });
});

const sortedFollowingsPostsArray = followingsPostsArray.sort((a, b) => { 
  // Parse the timestamps from postId and compare them
  const timestampA = parseInt(a.postId.split('-')[0], 10);
  const timestampB = parseInt(b.postId.split('-')[0], 10);
  
  return timestampB - timestampA;
});

if(document.querySelector(".js-followed-button-in-followed")) {
  document.querySelector(".js-followed-button-in-followed")
  .addEventListener('click', () => {
    scrollToTop();
  });
}

const followedPostsHTML = await displayAllPosts(sortedFollowingsPostsArray);
document.querySelector('.js-followed-section')
  .innerHTML = followedPostsHTML

addEventListenerForPostPreviewLinks();
postSetting();
clickedLikesDislikes();
clickedSaved();