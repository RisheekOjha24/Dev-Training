const User= require("../model/userSchema");
const Blog=require("../model/blogSchema");
const cloudinary=require("../utils/cloudinary");

const newBlog = async (req, res) => {
  const { blogId , title, content, email } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    let imageUrl = null;

    // Check if a file was uploaded and upload it to Cloudinary
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadResult.secure_url;
    }

    if (blogId) {
      // If blogId is provided, update the existing blog
      const existingBlog = await Blog.findById(blogId);
      if (!existingBlog) {
        return res.status(404).json({ msg: "Blog not found" });
      }

      // Update the blog fields
      existingBlog.title = title || existingBlog.title;
      existingBlog.content = content || existingBlog.content;
      existingBlog.imageUrl = imageUrl || existingBlog.imageUrl;
      existingBlog.approved = false;

      const updatedBlog = await existingBlog.save();
      return res.status(200).json(updatedBlog);

    } else {
      // If no blogId, create a new blog
      const newBlog = new Blog({
        title,
        content,
        authorId: user._id,
        authorName: user.name,
        imageUrl,
      });

      const savedBlog = await newBlog.save();
      return res.status(201).json(savedBlog);
    }
  } catch (err) {
    console.error(err);
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


const setBlogApprovalById = async (req, res) => {
   try {
     const { blogId } = req.body;

     const blog = await Blog.findById(blogId);
     if (!blog) {
       return res.status(404).json({ message: "Blog not found" });
     }

     blog.approved = !blog.approved;

     await blog.save();
     return res.status(200).json({
       message: "Blog approval status updated successfully",
     });
   } catch (error) {
     console.error(error);
     return res.status(500).json({ message: "Internal server error" });
   }
}

const deleteBlogById = async(req,res)=>{
  try {
    const {blogId} = req.params;
    
    const blog = await Blog.findById(blogId);
    
    if(!blog) return res.status(404).json({ message: "Blog not found" });

    await Blog.findByIdAndDelete(blogId);

    res.json({msg:"Blog deleted successfully"});

  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }
}


const getBlogInfo = async (req, res) => {
  try {
    const { blogId } = req.body;

    if (!blogId) {
      return res.status(400).json({ message: "Blog ID is required" });
    }

    // Fetching blog by ID, populate both likedBy (user details) and comments (with authorName, content)
    const blog = await Blog.findById(blogId)
      .populate('likedBy', 'username email')
     

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Return likes count, users who liked the blog, and the list of comments
    return res.status(200).json({
      likesCount: blog.likesCount,
      likedBy: blog.likedBy, 
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching likes and comments" });
  }
};

const sendLikeToBlog = async (req, res) => {
  try {
    const { blogId, email } = req.body;

    if (!blogId || !email) {
      return res.status(400).json({ message: "Blog ID and email are required" });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyLiked = blog.likedBy.includes(user._id);

    if (alreadyLiked) {
   
      blog.likedBy.pull(user._id);  // Remove the user ID from likedBy array
      blog.likesCount -= 1;         // Decrease the likes count

      await blog.save();

      return res.status(200).json({
        message: "Like removed successfully",
        likesCount: blog.likesCount,
      });
    } else {
      
      blog.likedBy.push(user._id);  
      blog.likesCount += 1;

      // Save the updated blog
      await blog.save();

      return res.status(200).json({
        message: "Like added successfully",
        likesCount: blog.likesCount,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding/removing like to blog" });
  }
};


const sendComment = async (req, res) => {
  try {
    const { blogId, content, email } = req.body;

    if (!blogId || !content || !email) {
      return res.status(400).json({ message: "Blog ID, content, and email are required" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = {
      content,
      // authorId: user._id,
      authorEmail:user.email,
      authorName: user.name,
      createdAt: new Date(),
    };

    blog.comments.push(newComment);
    await blog.save();

    return res.status(200).json({
      message: "Comment added successfully",
      comments: blog.comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding comment" });
  }
};

const delComment = async (req, res) => {
  try {
    const { commentId } = req.body;

    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required" });
    }

    const blog = await Blog.findOne({ 'comments._id': commentId });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found or comment not found" });
    }

    // find the index of comment from the comments array
    const commentIndex = blog.comments.findIndex(comment => comment._id.toString() === commentId);

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the comment from the array
    blog.comments.splice(commentIndex, 1);

    // Save the updated blog document
    await blog.save();

    // Respond with success
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while deleting the comment" });
  }
};


module.exports = {
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
};