import { posts } from "../../data/posts.js";
import { user } from "../../data/user.js";
import { users } from "../../data/users.js";
import { checkHasItNotBeenSaved } from "../post-settings/save-post-setting.js";


export function clickedSaved() {
  document.querySelectorAll('.saved-container').forEach((container) => {
    container.addEventListener('click', () => {
      const postId = container.dataset.savedContainerPostId;
      savedStuff(postId)
    })
  })
}


export function savedStuff(postId) {

  let savesCount = document.querySelector(`.js-saves-count-${postId}`).innerHTML;
  const savePostSettingElement = document.getElementById(`save-option-${postId}`)

  const postObj = posts.find((post) => post.postId === postId)

  // Check if the post exists
  if (!postObj) {
    console.error(`Post with ID ${postId} not found.`);
    return;
  }

  // Save or unsave the post based on current state
  if(checkHasItNotBeenSaved(postId)) {
    /* Save Post */

    console.log(`Save for later clicked for Post ID: ${postId}`); 

    // Increment both savesCount and postObj.ratings.saves
    savesCount++
    postObj.ratings.saves++

    // Ensure synchronization
    if(savesCount !== postObj.ratings.saves) {
      throw 'wtf';
    }
    
    // Add postId to user's saved posts Ids
    user.savedPostsIds.push(postId)

    // Update the UI for saved state
    document.querySelector(`.js-save-image-${postId}`).src = 'images/icons/on-page-saved.png'

    if(savePostSettingElement) {
      savePostSettingElement
        .innerHTML = 'Unsave Post'
    }

  } else {
    /* Unsave Post */

    console.log(`Unsave post clicked for Post ID: ${postId}`);

    // Decrement both savesCount and postObj.ratings.saves
    savesCount--
    postObj.ratings.saves--

    // Ensure synchronization
    if(savesCount !== postObj.ratings.saves) {
      throw 'wtf';
    }
    
    // Remove postId from user's savedPostsIds array
    user.savedPostsIds = user.savedPostsIds.filter((savedpostId) => {
      return !(savedpostId === postId)
    })

    // Update the UI for unsaved state
    document.querySelector(`.js-save-image-${postId}`).src = 'images/icons/non-page-saved.png'

    
    if(savePostSettingElement) {
      savePostSettingElement  
        .innerHTML = 'Save for later'
    }

  }

  // Update the saves count on the UI
  document.querySelector(`.js-saves-count-${postId}`).innerHTML = savesCount;

  // Console logging changes
  console.log(`savesCount: ${savesCount}\npostObj.ratings.saves: ${postObj.ratings.saves}`)
  console.log(user.savedPostsIds)

  // updating posts data
  const postIndex = posts.findIndex((post) => post.postId === postObj.postId);
  posts[postIndex] = postObj;

  // updating users data
  const userIndex = users.findIndex((u) => u.userId === user.userId);
  users[userIndex] = user;


  // Updating all the changes to localStorage
  localStorage.setItem('posts', JSON.stringify(posts));
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('user', JSON.stringify(user));
}