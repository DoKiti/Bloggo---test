const mysql = require('mysql');

// Create a pool of connections to the database
const pool = mysql.createPool({
  host: '127.0.0.1', // Or 'localhost'
  user: 'root',      // MySQL username
  password: 'your_password',  // MySQL password
  database: 'test_db' // Your database name
});

// Query the 'users' table in the 'test_db' database
pool.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
  console.log('Query results:', results);
});
