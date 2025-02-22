import {Post, posts} from "../data/posts.js";
import { generateUniquePostId } from "./utils/unique-post-id.js";

// default values
const postId = generateUniquePostId();
const ratings = {
  saves: 0,
  likes: 0,
  dislikes: 0,
  comments: 0
};
const authorId = '2';

// Get the input elements
const postTitleElement = document.getElementById('postTitle');
const postContentElement = document.getElementById('postContent');
const createPostButton = document.getElementById('createPostButton');

// Function to enable/disable button
function toggleCreatePostButton() {
  const title = postTitleElement.value.trim();
  const content = postContentElement.value.trim();
  createPostButton.disabled = title === '' || content === ''; // Disable button if either is empty
}

// Add event listeners for both title and content
postTitleElement.addEventListener('input', toggleCreatePostButton);
postContentElement.addEventListener('input', toggleCreatePostButton);


// Function to replace newlines with <br> for the post content
function convertNewlinesToBreaks(text) {
  return text.replace(/\n/g, '<br>');
}

// Handle post creation
document.getElementById('createPostButton').addEventListener('click', function() {
  const postTitle = document.getElementById('postTitle').value;
  const nonFormatedContent = document.getElementById('postContent').value;

  // Convert the content's newlines to <br> tags
  const texts = convertNewlinesToBreaks(nonFormatedContent);

  posts.unshift(new Post(postId, postTitle, texts, ratings, authorId));

  localStorage.setItem('posts', JSON.stringify(posts));

  window.location.href = "blog.html";
});