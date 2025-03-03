import { posts } from "../../data/posts.js";
import { users } from "../../data/users.js";

const windowLocation = window.location.href;

export function deletePost(postId) {
  // Filter out the post with the given postId from the posts array
  const updatedPosts = posts.filter(postObject => postObject.postId !== postId);

  // Update the users' postIds and savedPostsIds by removing the postId
  const updatedUsers = users.map((userObject) => {
    // Ensure the user has postIds and filter out the postId
    if (userObject.postsIds && Array.isArray(userObject.postsIds)) {
      userObject.postsIds = userObject.postsIds.filter((userPostId) => userPostId !== postId);
    }

    // Update the user's savedPostsIds by removing the postId
    if (userObject.savedPostsIds && Array.isArray(userObject.savedPostsIds)) {
      userObject.savedPostsIds = userObject.savedPostsIds.filter((savedPostId) => savedPostId !== postId);
    }

    return userObject; // Return the modified userObject
  });

  // Save the updated posts and users to localStorage
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // Optionally, redirect to refresh the page or re-render the updated posts list
  window.location.href = windowLocation;  
}
