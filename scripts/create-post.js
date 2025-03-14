import {Post, posts} from "../data/posts.js";
import {users} from "../data/users.js";
import { backButtonDirectory, whiteSpaceGoBack } from "./utils/back-button-href.js";
import { generateUniquePostId } from "./utils/unique-post-id.js";

backButtonDirectory();
whiteSpaceGoBack();

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
document.getElementById('createPostButton').addEventListener('click', async function() {
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

  // Find the author
  const author = users.find((u) => u.userId === authorId);
  console.log(author);

  // Update the author's postIds (add the new postId)
  author.postsIds.unshift(postId);

  // Create the post object
  const newPost = new Post(postId, postTitle, texts, ratings, authorId);



  // Send the new post to the backend API
  try {
    // Send a POST request to create the post
    const postResponse = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: postId,
        postTitle: postTitle,
        texts: texts,
        ratings: {
          likes: 0,
          saves: 0,
          dislikes: 0,
          comments: 0
        },
        authorId: authorId
      }),
    });
    
    if (postResponse.ok) {
      console.log('Post created successfully');

      // Send a POST request to update the user's postsIds
      const userResponse = await fetch(`http://localhost:3000/users/${authorId}/update-posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postsIds: author.postsIds }),
      });

      if (userResponse.ok) {
        console.log('User postsIds updated successfully');

        // Optionally update localStorage if needed
        posts.unshift(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        localStorage.setItem('users', JSON.stringify(users));

        // Redirect or go back
        window.history.back();
      } else {
        console.error('Failed to update user postsIds');
      }
    } else {
      console.error('Failed to create post');
    }
  } catch (err) {
    console.error('Error creating post:', err);
  }
});