import {posts} from "../../data/posts.js";
import { postSetting } from "../post-settings.js";
import { displayAllPosts } from "../utils/return-all-posts-HTML.js";
import { addEventListenerForPostPreviewLinks } from "../utils/event-listeners-links-for-post-previews.js";


export function displayAccesories(user) {
  document.querySelector(".js-latest-post-text-container")
    .innerHTML = `
                <p>
                    Latest posts from ${user.nickname}
                </p>
                `
}

export function displayAllUserPosts(user) {
  let postsArray = [];

  // Collect all posts corresponding to the user's postIds
  user.postsIds.forEach((postId) => {
    const postObject = posts.find(post => post.postId === postId);
    if (postObject) {
      postsArray.push(postObject);
    }
  });

  // Now, pass the posts array to displayAllPosts
  let userPostsHTML = displayAllPosts(postsArray);

  // Insert the HTML into the DOM
  document.querySelector(".js-user-posts").innerHTML = userPostsHTML;

  // Apply additional settings (post settings, etc.)
  addEventListenerForPostPreviewLinks();
  postSetting()
}
