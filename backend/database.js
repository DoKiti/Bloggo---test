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
      // Fetch saved posts
      const savedPostsIds = user.savedPostsIds ? user.savedPostsIds.split(',') : [];
      const savedPosts = await Promise.all(savedPostsIds.map(async (postId) => {
        const postQuery = 'SELECT * FROM posts WHERE postId = ?';
        const post = await queryDatabase(postQuery, [postId]);
        return post[0] || null; // Return the post or null if not found
      }));

      // Fetch liked posts
      const likedPostsIds = user.likedPostsIds ? user.likedPostsIds.split(',') : [];
      const likedPosts = await Promise.all(likedPostsIds.map(async (postId) => {
        const postQuery = 'SELECT * FROM posts WHERE postId = ?';
        const post = await queryDatabase(postQuery, [postId]);
        return post[0] || null; // Return the post or null if not found
      }));

      // Fetch disliked posts
      const dislikedPostsIds = user.dislikedPostsIds ? user.dislikedPostsIds.split(',') : [];
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
    res.json(posts); // Return posts to frontend
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Database query error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
