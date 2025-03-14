import { posts } from "../../data/posts.js";
import { user } from "../../data/user.js";
import { users } from "../../data/users.js";
import { checkHasItNotBeenSaved } from "../post-settings/save-post-setting.js";
import { displayingRatingsText } from "../utils/display-ratings-text.js";
import { updatePostAndUser } from "./clickedUpdate.js";

export function clickedSaved() {
  document.querySelectorAll('.saved-container').forEach((container) => {
    container.addEventListener('click', () => {
      const postId = container.dataset.savedContainerPostId;
      savedStuff(postId)
    })
  })
}


export async function savedStuff(postId) {
  const savesCountElement = document.querySelector(`.js-saves-count-${postId}`);
  let savesCount = savesCountElement.dataset.saves;
  const savePostSettingElement = document.getElementById(`save-option-${postId}`);

  const postObj = posts.find((post) => post.postId === postId);
  const authorObj = postObj.author;

  // Check if the post exists
  if (!postObj) {
    console.error(`Post with ID ${postId} not found.`);
    return;
  }

  // Save or unsave the post based on current state
  if (checkHasItNotBeenSaved(postId)) {
    // Save Post
    console.log(`Save for later clicked for Post ID: ${postId}`);

    // Increment savesCount, postObj.ratings.saves, and author's karma point
    savesCount++;
    postObj.ratings.saves++;
    authorObj.karmaPoints += 3;

    // Ensure synchronization
    if (savesCount !== postObj.ratings.saves) {
      throw 'Data inconsistency between savesCount and postObj.ratings.saves';
    }

    // Add postId to user's saved posts Ids
    user.savedPostsIds.push(postId);

    // Update the UI for saved state
    document.querySelector(`.js-save-image-${postId}`).src = 'images/icons/on-page-saved.png';

    if (savePostSettingElement) {
      savePostSettingElement.innerHTML = 'Unsave Post';
    }
  } else {
    // Unsave Post
    console.log(`Unsave post clicked for Post ID: ${postId}`);

    // Decrement savesCount, postObj.ratings.saves, and author's karma point
    savesCount--;
    postObj.ratings.saves--;
    authorObj.karmaPoints -= 3;

    // Ensure synchronization
    if (savesCount !== postObj.ratings.saves) {
      throw 'Data inconsistency between savesCount and postObj.ratings.saves';
    }

    // Remove postId from user's savedPostsIds array
    user.savedPostsIds = user.savedPostsIds.filter((savedpostId) => savedpostId !== postId);

    // Update the UI for unsaved state
    document.querySelector(`.js-save-image-${postId}`).src = 'images/icons/non-page-saved.png';

    if (savePostSettingElement) {
      savePostSettingElement.innerHTML = 'Save for later';
    }
  }

  // Updating the saves count on the data set
  savesCountElement.dataset.saves = savesCount;

  // Update the saves count on the UI
  savesCountElement.innerHTML = displayingRatingsText(savesCount);

  // Update post and user in the backend
  await updatePostAndUser(postObj, authorObj, user);

  // Persist changes to localStorage
  localStorage.setItem('posts', JSON.stringify(posts));
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('user', JSON.stringify(user));
}
