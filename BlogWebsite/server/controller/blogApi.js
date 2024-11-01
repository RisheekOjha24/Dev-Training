const User= require("../model/userSchema");
const Blog=require("../model/blogSchema");
const cloudinary=require("../utils/cloudinary");

const newBlog = async (req, res) => {

  const { title, content, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    let imageUrl = null;

    // Check if a file was uploaded
    if (req.file) {
      // Upload the image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadResult.secure_url; // Get the secure URL for the uploaded image
    }

    const newBlog = new Blog({
      title,
      content,
      authorId: user._id, // Updated to match your schema
      authorName: user.name,
      imageUrl, // Set imageUrl if available
    });

    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const allBlogs = async (req, res) => {
  try {
    // Fetch only approved blogs
    const blogs = await Blog.find(
      {}, // No Filter, retrieves all blogs
      "title authorName authorId createdAt updatedAt _id approved"
    );

    const response = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      authorName: blog.authorName,
      approved:blog.approved,
      authorId: blog.authorId,
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
    }));
       
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const blogById = async (req, res) => {

  try {
    const { blogId } = req.body;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    // Send the entire blog document in the response
    res.json(blog);

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const addComment = async (req, res) => {
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


const myBlog = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email to get their ID
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all blogs by this user's ID
    const blogs = await Blog.find(
      { authorId: user._id },
      "title authorName authorId createdAt updatedAt _id"
    );

    // Respond with the blogs
    res.status(200).json(blogs);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports={newBlog,allBlogs,blogById,addComment,myBlog};