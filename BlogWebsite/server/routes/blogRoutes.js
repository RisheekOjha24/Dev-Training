const express = require('express');
const router = express.Router();
const Blog = require('../model/blogSchema');
const User = require("../model/userSchema");
const {
  newBlog,
  allBlogs,
  blogById,
  myBlog,
  setBlogApprovalById,
  deleteBlogById,
  getBlogInfo,
  sendLikeToBlog,
  sendComment,
  delComment
} = require("../controller/blogApi");
const upload = require("../middleware/multer.middleware");

//  /api/blog is home url
router.post("/newblog", upload.single("image"), newBlog);


router.get('/allBlogs', allBlogs);

router.post('/viewBlogs', blogById);

router.post('/myBlogs',myBlog)

router.post("/setBlogApproval", setBlogApprovalById);

router.delete("/deleteBlog/:blogId",deleteBlogById);

router.post("/getBlogInfo", getBlogInfo);

router.post("/sendLikesToBlog",sendLikeToBlog);

router.post("/sendComment", sendComment);

router.post("/deleteComment",delComment)

module.exports = router;
