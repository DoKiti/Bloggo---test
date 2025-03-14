import { posts } from "../../data/posts.js";
import { users } from "../../data/users.js";

const windowLocation = window.location.href;

export async function deletePost(postId) {
  try {
    // Step 1: Delete the post from the backend (MySQL database)
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete post from backend');
    }

    console.log('Post successfully deleted from backend.');

    // Step 2: Update localStorage with updated posts and users
    const updatedPosts = posts.filter(postObject => postObject.postId !== postId);
    const updatedUsers = users.map(userObject => {
      if (userObject.postsIds && Array.isArray(userObject.postsIds)) {
        userObject.postsIds = userObject.postsIds.filter(userPostId => userPostId !== postId);
      }
      if (userObject.savedPostsIds && Array.isArray(userObject.savedPostsIds)) {
        userObject.savedPostsIds = userObject.savedPostsIds.filter(savedPostId => savedPostId !== postId);
      }
      return userObject;
    });

    // Step 3: Save to localStorage
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Optionally redirect or refresh the page
    window.location.reload();
  } catch (error) {
    console.error('Error deleting post:', error.message);
    alert('An error occurred while deleting the post. Please try again later.');
  }
}
