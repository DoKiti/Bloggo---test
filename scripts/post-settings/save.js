import { posts } from "../../data/posts.js";
import { users } from "../../data/users.js";
import { displayError } from "../displayError.js";


export function savePost(postId) {
  // default values
  const userId = '1'

  try{
    const updatedUsers = users.map((user) => {
      if(user.userId === userId) {
        user.savedPostsIds.push(postId);
      }
      return user;
    })

    const updatedPosts = posts.map((post) => {
      if(post.postId === postId) {
        post.ratings.saves++;
      }
      return post;
    })

    // Save the updated posts and users to localStorage
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    localStorage.setItem("users", JSON.stringify(updatedUsers)); 
  }
  catch {
    displayError()   
  }
}


export function unsavePost(postId) {
  // default values
  const userId = '1'

  try{
    const updatedUsers = users.map((user) => {
      if(user.userId === userId) {
        user.savedPostsIds = user.savedPostsIds.filter((savedPostId) => savedPostId !== postId);

        if (user.savedPostsIds.length === 0) {
          user.savedPostsIds = [];  // Explicitly set it as an empty array
        }
      }
      return user;
    })

    const updatedPosts = posts.map((post) => {
      if(post.postId === postId) {
        post.ratings.saves--;
      }
      return post;
    })

    // Save the updated posts and users to localStorage
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    localStorage.setItem("users", JSON.stringify(updatedUsers)); 
  }
  catch {
    displayError()   
  }
}

export function checkHasItNotBeenSaved(postId) {
  // default values
  let hasItNotBeenSaved = true;

  const userId = '1'
  users.forEach((user) => {
    if(user.userId === userId) {
      if(user.savedPostsIds.includes(postId)) {
        hasItNotBeenSaved = false
      }
    }
  })

  console.log(`${postId} with ${hasItNotBeenSaved}`)

  return hasItNotBeenSaved
}