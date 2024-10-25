const express = require('express');
const router = express.Router();
const Blog = require('../model/blogSchema');
const User = require("../model/userSchema");
const {newBlog,allBlogs,blogById,addComment} = require("../controller/blogApi");

//  /api/blog is home url
router.post('/newblog', newBlog);


router.get('/blogs', allBlogs);

router.get('/blogs/:id', blogById);

router.post('/blogs/:id/comments', addComment);

module.exports = router;
