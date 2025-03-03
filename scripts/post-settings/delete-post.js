import { posts } from "../../data/posts.js";
import { users } from "../../data/users.js";
import { savedPostsIds } from "../../data/saves.js";

const windowLocation = window.location.href;

export function deletePost(postId) {
  // Filter out the post with the given postId from the posts array
  const updatedPosts = posts.filter(postObject => postObject.postId !== postId);

  // Update the users' postIds by removing the postId
  const updatedUsers = users.map((userObject) => {
    // Ensure the user has postIds and filter out the postId
    if (userObject.postsIds && Array.isArray(userObject.postsIds)) {
      // Reassign filtered postIds
      userObject.postsIds = userObject.postsIds.filter((userPostId) => userPostId !== postId);
    }
    return userObject; // Return the modified userObject
  });


  // Remove the postId from saved posts if it exists
  const updatedSavedPostsIds = savedPostsIds.filter(savedPost => savedPost.postId !== postId);

  // Save the updated posts and users to localStorage
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.setItem("savedPosts", JSON.stringify(updatedSavedPostsIds))

  // Optionally, redirect to refresh the page or re-render the updated posts list
  window.location.href = windowLocation;  
}