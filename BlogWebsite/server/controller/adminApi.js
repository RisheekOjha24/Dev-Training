const User = require("../model/userSchema");
const Blog = require("../model/blogSchema");

const getAllUsers = async (req, res) => {
  try {
    
    const users = await User.find({}, { notifications: 0 }); 

    res.json(users)
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const suspendUser = async (req, res) => {
  try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ message: "Invalid User ID" });
      }
      

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newSuspendedStatus = !user.isSuspended;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isSuspended: newSuspendedStatus }, // Set the user as suspended
      { new: true } // Return the updated document
    );

    // Check if user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: "User account activated/suspended successfully."});

  } catch (error) {
    console.error("Error suspending user:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

module.exports={getAllUsers,suspendUser}