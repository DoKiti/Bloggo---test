import {users} from "../../data/users.js";

// Function to get the value of a URL parameter
export function getUserIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('userId'); // Get 'postId' parameter value from the URL
}

// Function to find the post by id
export function getUserById(userId) {
  return users.find(user => user.userId === userId); // Finds the post by matching postId
}