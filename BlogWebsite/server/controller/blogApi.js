const User= require("../model/userSchema");
const Blog=require("../model/blogSchema");

const newBlog=async (req, res) => {
    const { title, content, email } = req.body;
  
    try {
       
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
      }
      const newBlog = new Blog({
        title,
        content,
        author: user._id,
        authorName: user.name,
      });
  
    
      const savedBlog = await newBlog.save();
  
      res.status(201).json(savedBlog);
    } catch (err) {
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  }

const allBlogs=async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name');


        const response = blogs.map(blog => ({
          authorId: blog.author._id,                  
          authorName: blog.author.name,               
          title: blog.title,                           
          content: blog.content,                      
          createdAt: blog.createdAt.toISOString()
        }));
        res.status(200).json(response);
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  };


const blogById=async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id).populate('author', 'name');
      if (!blog) {
        return res.status(404).json({ msg: "Blog not found" });
      }
      res.json(blog);
    } catch (err) {
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  }

const addComment= async (req, res) => {
    const { userId, content } = req.body;
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ msg: "Blog not found" });
      }
  
      blog.comments.push({ userId, content });
      await blog.save();
      res.status(201).json(blog);
    } catch (err) {
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  }

  module.exports={newBlog,allBlogs,blogById,addComment};