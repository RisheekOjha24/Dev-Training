const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const app = express();

// In-memory hashmap to store users
let users = new Map();

app.set('view engine', 'pug');
app.set('views', './views');

// Middleware to parse POST data
app.use(express.urlencoded({ extended: true }));


// Route for Home page (landing)
app.get('/', (req, res) => {
  res.render('index');
});

// Route for Login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Route for Signup page
app.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle Signup form submission
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  if (users.has(username)) {
    return res.send('User already exists. Please login.');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store user in the hashmap (username as key, hashed password as value)
  users.set(username, hashedPassword);
  res.send('Signup successful! Please log in.');
});

// Handle Login form submission
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!users.has(username)) {
    return res.send('User not found. Please sign up first.');
  }

  const storedPassword = users.get(username);
  const match = await bcrypt.compare(password, storedPassword);

  if (match) {
    req.session.user = username;  // Store the user in session
    res.send('Login successful! Welcome ' + username);
  } else {
    res.send('Incorrect password. Please try again.');
  }
});

// Route for Logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error in logging out');
    }
    res.send('Logged out successfully');
  });
});

const PORT = 3800;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
