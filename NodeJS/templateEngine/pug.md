# Pug (formerly known as Jade)
Pug is a templating engine for Node.js, commonly used to simplify HTML structure with a clean and indentation-based syntax. 

# Basic Pug Syntax
Pug is indentation-based, meaning indentation (usually with 2 or 4 spaces) is essential for defining elements and their hierarchy.

Elements are written without angle brackets (< >):

#  Attributes
Add attributes in parentheses after an element
a(href="https://example.com" target="_blank") Link to Example

# Variables and Interpolation
In Pug, #{} is used for outputting variables within text (like inside a paragraph or heading)

app.get('/', (req, res) => {
  res.render('index', { title: 'My Pug Page', message: 'Hello, Pug!' });
});

# In your Pug file (index.pug)
h1 #{title}
p #{message}

# Conditionals and Loops
Conditionals: Use if, else if, and else
You can define variables directly within your Pug file using the - symbol, like this:

- var loggedIn = true
if loggedIn
  p Welcome back, user!
else
  p Please log in.

# ID and class defining in pug
// " . " (dot) For class name,  " # " For Id and Attributes are define inside round bracket
div.container#main-content
  p.text-info Welcome to Pug!
