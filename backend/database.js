const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
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

    // Process user posts and return detailed information
    const usersWithPostDetails = await Promise.all(users.map(async (user) => {
      const savedPostsIds = user.savedPostsIds ? JSON.parse(user.savedPostsIds) : [];
      const likedPostsIds = user.likedPostsIds ? JSON.parse(user.likedPostsIds) : [];
      const dislikedPostsIds = user.dislikedPostsIds ? JSON.parse(user.dislikedPostsIds) : [];

      // Fetch posts associated with saved, liked, and disliked posts
      const fetchPosts = async (postIds) => {
        return Promise.all(postIds.map(async (postId) => {
          const postQuery = 'SELECT * FROM posts WHERE postId = ?';
          const post = await queryDatabase(postQuery, [postId]);
          return post[0] || null;
        }));
      };

      const savedPosts = await fetchPosts(savedPostsIds);
      const likedPosts = await fetchPosts(likedPostsIds);
      const dislikedPosts = await fetchPosts(dislikedPostsIds);

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
      post.ratings = JSON.parse(post.ratings);
      return post;
    });

    res.json(formattedPosts); // Return posts to frontend
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Database query error' });
  }
});


// API endpoint to create a new post
app.post('/posts', async (req, res) => {
  const { postId, postTitle, texts, ratings, authorId } = req.body;

  try {
    const query = 'INSERT INTO posts (postId, postTitle, texts, ratings, authorId) VALUES (?, ?, ?, ?, ?)';
    await queryDatabase(query, [postId, postTitle, texts, JSON.stringify(ratings), authorId]);
    
    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    console.error('Error inserting post:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});


// API endpoint to update a user's postsIds
app.post('/users/:userId/update-posts', async (req, res) => {
  const userId = req.params.userId;
  const { postsIds } = req.body;

  try {
    // Update the user's postsIds in the database
    const query = 'UPDATE users SET postsIds = ? WHERE userId = ?';
    await queryDatabase(query, [JSON.stringify(postsIds), userId]);

    res.status(200).json({ message: 'User postsIds updated successfully' });
  } catch (err) {
    console.error('Error updating user postsIds:', err);
    res.status(500).json({ error: 'Failed to update user postsIds' });
  }
});


app.delete('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  console.log('Attempting to delete post with postId:', postId);

  try {
    // Step 1: Delete the post from the posts table
    const deletePostQuery = 'DELETE FROM posts WHERE postId = ?';
    const deletePostResult = await queryDatabase(deletePostQuery, [postId]);

    if (deletePostResult.affectedRows === 0) {
      console.error('Post not found in the database.');
      return res.status(404).json({ error: 'Post not found' });
    }

    console.log('Post successfully deleted from posts table.');

    // Step 2: Update the users' postsIds to remove the postId
    console.log('Updating user with postId:', postId);
    const updateUserQuery = `
      UPDATE users 
      SET postsIds = JSON_REMOVE(postsIds, JSON_UNQUOTE(JSON_SEARCH(postsIds, 'one', ?)))
      WHERE JSON_CONTAINS(postsIds, ?)
    `;
    const updateUserResult = await queryDatabase(updateUserQuery, [postId, JSON.stringify([postId])]);

    if (updateUserResult.affectedRows === 0) {
      console.error('No user was updated.');
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Database error while deleting post' });
  }
});




/*
// Endpoint to update a post
app.put('/posts/:postId', (req, res) => {
  const { postId } = req.params;
  const { ratings, content, authorId } = req.body;

  const updatePostQuery = `
    UPDATE posts
    SET ratings = ?, content = ?
    WHERE postId = ?
  `;
  
  pool.query(updatePostQuery, [JSON.stringify(ratings), content, postId], (err, result) => {
    if (err) {
      console.error('Error updating post:', err);
      return res.status(500).json({ error: 'Failed to update post' });
    }

    // After updating the post, update the author's karma points
    updateAuthorKarmaPoints(authorId, ratings.likes, ratings.dislikes, ratings.saves)
      .then(() => res.status(200).json({ message: 'Post updated successfully' }))
      .catch((error) => {
        console.error('Error updating author karma points:', error);
        res.status(500).json({ error: 'Failed to update author karma points' });
      });
  });
});


// Endpoint to update a user (the user who liked, disliked, or saved the post)
app.put('/users/:userId', (req, res) => {
  const { userId } = req.params;
  const { karmaPoints, likedPostsIds, dislikedPostsIds, savedPostsIds } = req.body;

  const updateUserQuery = `
    UPDATE users
    SET karmaPoints = ?, likedPostsIds = ?, dislikedPostsIds = ?, savedPostsIds = ?
    WHERE userId = ?
  `;

  pool.query(updateUserQuery, [karmaPoints, JSON.stringify(likedPostsIds), JSON.stringify(dislikedPostsIds), JSON.stringify(savedPostsIds), userId], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Failed to update user' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  });
});


// Function to update the author's karma points
const updateAuthorKarmaPoints = (authorId, likes, dislikes, saves) => {
  return new Promise((resolve, reject) => {
    const getAuthorQuery = `
      SELECT karmaPoints FROM users WHERE userId = ?
    `;

    db.query(getAuthorQuery, [authorId], (err, results) => {
      if (err) {
        return reject('Error fetching author data');
      }

      const author = results[0];
      let updatedKarmaPoints = author.karmaPoints;

      // Adjust karma points based on likes, dislikes, and saves
      updatedKarmaPoints += likes * 1;    // Each like adds 1 karma point
      updatedKarmaPoints -= dislikes * 1; // Each dislike subtracts 1 karma point
      updatedKarmaPoints += saves * 3;    // Each save adds 3 karma points

      const updateKarmaQuery = `
        UPDATE users SET karmaPoints = ? WHERE userId = ?
      `;
      db.query(updateKarmaQuery, [updatedKarmaPoints, authorId], (err, result) => {
        if (err) {
          return reject('Error updating karma points');
        }
        resolve();
      });
    });
  });
};




*/



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
