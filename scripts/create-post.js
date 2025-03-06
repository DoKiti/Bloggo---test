import {Post, posts} from "../data/posts.js";
import {users} from "../data/users.js";
import { backButtonDirectory, whiteSpaceGoBack } from "./utils/back-button-href.js";
import { generateUniquePostId } from "./utils/unique-post-id.js";

backButtonDirectory()
whiteSpaceGoBack()

const authorId = '1';

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
  // default values
  const postId = generateUniquePostId();
  const ratings = {
    saves: 0,
    likes: 0,
    dislikes: 0,
    comments: 0
  };

  const postTitle = document.getElementById('postTitle').value;
  const nonFormatedContent = document.getElementById('postContent').value;

  // Convert the content's newlines to <br> tags
  const texts = convertNewlinesToBreaks(nonFormatedContent);

  const author = users.find((u) => u.userId === authorId) 
  console.log(author)
  author.postsIds.unshift(postId)

  posts.unshift(new Post(postId, postTitle, texts, ratings, authorId));



  localStorage.setItem('posts', JSON.stringify(posts));
  localStorage.setItem('users', JSON.stringify(users));

  window.history.back()
});