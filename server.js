const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '312531', // Replace with your MySQL password
  database: 'complaints' // Replace with your MySQL database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, registration_number, block_room_number, email, Complaint_Type, message } = req.body;

  const sql = 'INSERT INTO complaints (name, registration_number, block_room_number, email, Complaint_Type, message) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, registration_number, block_room_number, email, Complaint_Type, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error submitting your complaint');
      return;
    }
    res.send('Thank you! Your submission has been received!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
