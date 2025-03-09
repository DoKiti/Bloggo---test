import { posts } from "../../data/posts.js";
import { user } from "../../data/user.js";
import { users } from "../../data/users.js";
import { displayError } from "../displayError.js";

/* NOT USED KINDA ASS SINCE THERE IS savedStuff
export function savePost(postId) {
  // default values ==> user
  try{
    user.savedPostsIds.push(postId);

    const userIndex = users.findIndex((u) => u.userId === user.userId);

    users[userIndex] = user;

    const updatedPosts = posts.map((post) => {
      if(post.postId === postId) {
        post.ratings.saves++;
      }
      return post;
    })

    document.getElementById(`save-option-${postId}`)
      .innerHTML = 'Unsave Post'
    document.querySelector(`.js-save-image-${postId}`).src = 'images/icons/on-page-saved.png';

    // Save the updated posts and users to localStorage
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    localStorage.setItem("users", JSON.stringify(users)); 
    localStorage.setItem("user", JSON.stringify(user)); 
  }
  catch {
  }
}


export function unsavePost(postId) {
  // default values => user

  try{
    user.savedPostsIds = user.savedPostsIds.filter((savedPostId) => savedPostId !== postId);

    const userIndex = users.findIndex((u) => u.userId === user.userId);

    users[userIndex] = user;

    const updatedPosts = posts.map((post) => {
      if(post.postId === postId) {
        post.ratings.saves--;
      }
      return post;
    })

    document.getElementById(`save-option-${postId}`)
      .innerHTML = 'Save for later'
    document.querySelector(`.js-save-image-${postId}`).src = 'images/icons/non-page-saved.png';

    // Save the updated posts and users to localStorage
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    localStorage.setItem("users", JSON.stringify(users)); 
    localStorage.setItem("user", JSON.stringify(user)); 
  }
  catch {
    displayError()   
  }
}
*/

export function checkHasItNotBeenSaved(postId) {
  // default values => user
  let hasItNotBeenSaved = true;

  // console.log(user.savedPostsIds, postId)

  if(user.savedPostsIds.includes(postId)) {
    hasItNotBeenSaved = false
  }

  /* LATER
  console.log(`${postId} with ${hasItNotBeenSaved}`)
  */

  return hasItNotBeenSaved
}