import { posts } from "../../data/posts.js"; // Assuming you want to check against users or posts

export function generateUniquePostId() {
  let uniquePostId;

  // Function to check if the postId is already taken
  function isPostIdTaken(id) {
    // Assuming we want to check if the postId exists in the `posts` array or `users` array
    // Check if ID is in posts (or users if you want to check there)
    return posts.some(post => post.postId === id);
  }

  // Loop until we generate a unique ID
  do {
    const timestamp = Date.now(); // Get the current timestamp
    const randomComponent = Math.floor(Math.random() * 1000); // Add randomness to ensure uniqueness
    uniquePostId = `${timestamp}-${randomComponent}`; // Generate the ID
    
  } while (isPostIdTaken(uniquePostId)); // Keep checking until we find a unique ID

  return uniquePostId;
}
