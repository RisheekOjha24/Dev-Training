const express = require('express');
const bcrypt = require('bcryptjs');
const {setUser}= require('./service/auth');
const app = express();
const cookieParser = require('cookie-parser');

const decoded = require('./middleware/verifyToken');
app.use(cookieParser());

let users = new Map();

app.set('view engine', 'pug');
app.set('views', './views');

// Middleware to parse POST data
app.use(express.urlencoded({ extended: true }));
// Route for Home page (landing)

app.get('/', decoded,(req, res) => {

  try {
    const token = req.cookies.uuid;
   

    console.log(token);
    
    res.render('index', { isAdmin: true, username: "Risheek" });
    
  } catch (error) {
    res.send(`<h1> Plesase login dear user</h1>`)
  }
 
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

// Handle Login form submission
app.post('/login', async (req, res) => {
  
  const { username, password } = req.body;

  try {
    
    if (!users.has(username)) {
      return res.send('User not found. Please sign up first.');
    }

    const token= setUser(username);
    
    res.cookie('uuid',token);
  
    const storedPassword = users.get(username);
    const match = await bcrypt.compare(password, storedPassword);
  
    if (match) {
      res.send(`Login successful! Welcome <a href='/'>Home<a>` + username);
    } else {
      res.send('Incorrect password. Please try again.');
    }
    
  } catch (error) {
    console.log(error);
  }
  
  
});

// Route for Logout (No session-related logic needed)
app.get('/logout', (req, res) => {
  res.send('You are logged out. No session to clear.');
});

const PORT = 3800;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
