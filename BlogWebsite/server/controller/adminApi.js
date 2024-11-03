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

const notifyUser = async (req, res) => {
  try {
    const { id, msg } = req.body;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // we are seeting the limit of sending of storiung notification to 10
     if (user.notifications.length >= 10) {
    //  Removing the oldest notification
       user.notifications.shift();
     }

    user.notifications.push({
      message: msg,
      date: new Date(),
      read: false,
    });

    await user.save();

    return res.status(200).json({ message: "Notification sent successfully" });
    
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while notifying the user" });
  }
};

module.exports = { getAllUsers, suspendUser, notifyUser };