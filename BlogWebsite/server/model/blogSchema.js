const mongoose = require('mongoose');
const User = require("../model/userSchema");


const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  authorEmail: {
    type: String,
    require:true
  },
  authorName: {
    type: String,
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});


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

    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  authorName: {
    type: String,
    required: true, 
  },
  imageUrl: {
    type: String,
  },
  comments: [commentSchema],
  likesCount: {
   
    type: Number,
    default: 0, 
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  approved: {
  
    type: Boolean,
    default: false
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