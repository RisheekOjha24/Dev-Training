# REST: 
REST is an architectural style that uses standard HTTP methods and is designed for web services.

In REST, everything is considered a resource (like users, products, or posts)that can be identified by a unique URL. You interact with these resourcesusing standard HTTP methods (GET, POST, PUT, DELETE).

## Data Format: 
Primarily uses JSON for data exchange, but can also support XML, HTML, and plain text.
## Protocol: 
Built on top of HTTP and leverages its features like caching, authentication, and status codes.
## Statelessness: 
Each request from a client to a server must contain all the information the server needs to fulfill that request, making REST stateless.

Each request from a client must contain all the information needed for the server to fulfill it, which makes REST services stateless and easier to scale.

## Example of Rest API in Nodejs
```
// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory array to hold items
let items = [];

// RESTful Routes
// Create an item
app.post('/items', (req, res) => {
    const item = req.body;
    items.push(item);
    res.status(201).json(item); // Send back the created item
});

// Read all items
app.get('/items', (req, res) => {
    res.json(items);
});

// Read a single item by ID
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Item not found');
    items[index] = req.body; // Update item
    res.json(items[index]);
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Item not found');
    items.splice(index, 1); // Remove item
    res.status(204).send(); // No content
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```