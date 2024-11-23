const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dbConnect = require("./dbConnect");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const adminRoutes = require("./routes/adminRoute");

require("dotenv").config();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Update this with your allowed frontend origin
    methods: ["GET", "POST"]
  }
});

//making io global
global.io = io;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecting the Database
dbConnect();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/admin', adminRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const users = new Map();
global.users=users;
// WebSocket connection
io.on("connection", (socket) => {
  
  console.log("New client connected:", socket.id);

    socket.on("user-logged-in",(userEmail)=>{
      users.set(userEmail,socket.id);
      console.log(`User Logged In ${userEmail} -> ${socket.id}`);
    })

  // Listening for events from the client
  socket.on("send-msg",(data)=>{
    console.log(data);
  })

  socket.on("message", (data) => {
    console.log("Message received from client:", data);
  });
  // Handling client disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

});

// Server listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
