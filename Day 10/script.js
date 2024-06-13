const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3001; // Change the port to 3001

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'form',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Serve static files (HTML form)
app.use(express.static('public'));

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { Name, Email, Phone, State, Gender, Comment } = req.body;
  const sql = 'INSERT INTO datas (Name, Email, Phone, State, Gender, Comment) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [Name, Email, Phone, State, Gender, Comment], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err.stack);
      res.send('There was an error processing your request.');
    } else {
      res.send('Form submitted successfully!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
