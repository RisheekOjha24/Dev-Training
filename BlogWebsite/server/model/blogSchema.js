const mongoose = require('mongoose');
const User = require("../model/userSchema");


const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true, // Ensure that the comment content is provided
  },
  authorId: {
    // Reference to the user who wrote the comment
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  authorName: {
    type: String,
    required: true, // Ensure that the author's name is always provided
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to current date
  },
});


// Define the Blog Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  authorId: {
    // Renamed for clarity
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  authorName: {
    type: String,
    required: true, // Ensure that the author's name is always provided
  },
  imageUrl: {
    // New field for Cloudinary image link
    type: String,
  },
  comments: [commentSchema], // Array of comments
  likesCount: {
   
    type: Number,
    default: 0, // Default to 0 when created
  },
  likedBy: [
    {
      // Array to track users who liked the blog
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  approved: {
    // New field for approval status
    type: Boolean,
    default: false// Default to false until approved for time being approved to true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;