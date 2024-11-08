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

// Session configuration
app.use(session({
  secret: 'ANimal',  
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Route for Home page (landing)
app.get('/', (req, res) => {
  res.render('index', { isAdmin: true, username: "Risheek" });
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

  const hashedPassword = await bcrypt.hash(password, 10);

  users.set(username, hashedPassword);

  res.send(`<h1>Signup successful! Please log in.</h1>
    <a href="/login">Login</a>`);
});


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
