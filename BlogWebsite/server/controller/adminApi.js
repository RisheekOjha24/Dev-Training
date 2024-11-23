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

    // we are seeting the limit of sending of storing notification to 10
     if (user.notifications.length >= 10) {
       user.notifications.shift();
     }

     console.log("Hash map = ",users);

     console.log("users email ",users.email , "real email = ",user.email);

     const userSocketId = global.users.get(user.email); // Get the socket ID using the user's email
     console.log(userSocketId);
     if (userSocketId) {
      console.log("User socket id : ",userSocketId);
      global.io.to(userSocketId).emit("notification", { message: msg }); 
      console.log(`Notification sent to user ${user.email}`);
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

const makeOrRemoveUserAdmin = async (req, res) => {
  try {
    const { superAdminUser, user } = req.body;

    const superAdmin = await User.findOne({ email: superAdminUser });
    if (!superAdmin || !superAdmin.isSuperAdmin) {
      return res.status(403).json({ message: "Only super admins can perform this action." });
    }

    const targetUser = await User.findOne({ email: user });
    if (!targetUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Toggle the isAdmin status
    targetUser.isAdmin = !targetUser.isAdmin;
    await targetUser.save();

    res.json({
      message: `User ${targetUser.isAdmin ? "promoted to" : "demoted from"} admin successfully.`,
      user: targetUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating user admin status." });
  }
};


module.exports = { getAllUsers, suspendUser, notifyUser, makeOrRemoveUserAdmin};