const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());  // This enables CORS for all origins

// Create a connection pool to MySQL
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'KitiTheBear93#',
  database: 'bloggo'
});

// Helper function to query the database
const queryDatabase = (query, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// API endpoint to fetch users
app.get('/users', async (req, res) => {
  try {
    const usersQuery = 'SELECT * FROM users';
    const users = await queryDatabase(usersQuery);

    // For each user, fetch their saved, liked, and disliked posts
    const usersWithPostDetails = await Promise.all(users.map(async (user) => {
      // Fetch saved posts (assuming savedPostsIds is now a JSON array)
      const savedPostsIds = user.savedPostsIds ? JSON.parse(user.savedPostsIds) : [];
      const savedPosts = await Promise.all(savedPostsIds.map(async (postId) => {
        const postQuery = 'SELECT * FROM posts WHERE postId = ?';
        const post = await queryDatabase(postQuery, [postId]);
        return post[0] || null; // Return the post or null if not found
      }));

      // Fetch liked posts (assuming likedPostsIds is now a JSON array)
      const likedPostsIds = user.likedPostsIds ? JSON.parse(user.likedPostsIds) : [];
      const likedPosts = await Promise.all(likedPostsIds.map(async (postId) => {
        const postQuery = 'SELECT * FROM posts WHERE postId = ?';
        const post = await queryDatabase(postQuery, [postId]);
        return post[0] || null; // Return the post or null if not found
      }));

      // Fetch disliked posts (assuming dislikedPostsIds is now a JSON array)
      const dislikedPostsIds = user.dislikedPostsIds ? JSON.parse(user.dislikedPostsIds) : [];
      const dislikedPosts = await Promise.all(dislikedPostsIds.map(async (postId) => {
        const postQuery = 'SELECT * FROM posts WHERE postId = ?';
        const post = await queryDatabase(postQuery, [postId]);
        return post[0] || null; // Return the post or null if not found
      }));

      // Add the posts to the user object
      return {
        ...user,
        savedPosts,
        likedPosts,
        dislikedPosts,
      };
    }));

    res.json(usersWithPostDetails); // Send the response with detailed user info
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Database query error' });
  }
});


// API endpoint to fetch posts
app.get('/posts', async (req, res) => {
  try {
    const postsQuery = 'SELECT * FROM posts';
    const posts = await queryDatabase(postsQuery);

    // Process the posts to parse the 'ratings' JSON string
    const formattedPosts = posts.map(post => {
      // Parse the ratings string to an actual object
      post.ratings = JSON.parse(post.ratings);
      return post;
    });

    res.json(formattedPosts); // Return posts to frontend
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Database query error' });
  }
});
