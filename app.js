// Railway-based Admin Panel Deployment
// Prerequisites: Node.js environment and Express.js framework

const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Static files and view engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Login page
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/auth', (req, res) => {
  const { username, password } = req.body;
  if ((username === 'admin' || username === 'admin@gmail.com') && password === '@Userzeroyt7') {
    req.session.loggedin = true;
    req.session.username = username;
    res.redirect('/admin');
  } else {
    res.send('Incorrect Username and/or Password!');
  }
});

// Admin dashboard
app.get('/admin', (req, res) => {
  if (req.session.loggedin) {
    db.query('SELECT * FROM users', (err, users) => {
      if (err) throw err;
      res.render('admin', { users });
    });
  } else {
    res.redirect('/');
  }
});

// Add user
app.post('/addUser', (req, res) => {
  const { username, password } = req.body;
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
    if (err) throw err;
    res.redirect('/admin');
  });
});

// Delete user
app.post('/deleteUser', (req, res) => {
  const { id } = req.body;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/admin');
  });
});

// View user password
app.get('/viewPassword/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT password FROM users WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.send(`Password: ${results[0].password}`);
    } else {
      res.send('User not found.');
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
