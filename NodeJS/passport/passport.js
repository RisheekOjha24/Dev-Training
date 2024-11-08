const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const app = express();

// Dummy user data
const users = [{ id: 1, username: 'john', password: 'password123' }];

passport.serializeUser((user, done) => {
  done(null, user.id);  
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    if (user.password !== password) return done(null, false, { message: 'Incorrect password.' });
    return done(null, user);  // Successful authentication
  }
));

// Middleware to parse POST data
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret_key', 
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());  

// Route for login page
app.get('/login', (req, res) => {
  res.send(`
    <form action="/login" method="post">
      <label>Username: </label><input type="text" name="username" required><br>
      <label>Password: </label><input type="password" name="password" required><br>
      <button type="submit">Login</button>
    </form>
  `);
});

// Handle login form submission
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',  
  failureRedirect: '/login',     
  failureFlash: true
}));

// Dashboard (only accessible if logged in)
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome to your dashboard, ${req.user.username}! <a href="/logout">Logout</a>`);
  } else {
    res.redirect('/login');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return res.send('Error logging out'); }
    res.redirect('/login');
  });
});

const PORT = 3900;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
