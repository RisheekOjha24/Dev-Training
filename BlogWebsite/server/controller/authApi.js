const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generating JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "WFH", { expiresIn: "1h" });


    //taking out unread notification count
      const notifications = user.notifications;

      const unreadCount = notifications.filter(
        (notification) => !notification.read
      ).length;

    res.status(200).json({
      token,
        name: user.name,
        email: user.email,
        isAdmin:user.isAdmin,
        isSuspended:user.isSuspended,
        unreadCount:unreadCount
    });
  } catch (err) {
    // Handle server error
    console.log(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Register function
const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  
  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords don't match" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {

    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const getNotficationByEmail = async(req,res)=>{
  try {
  const userEmail = req.query.email; 

  if (!userEmail) {
    return res.status(400).json({ message: "Email parameter is required" });
  }

  const user = await User.findOne({ email: userEmail }); 
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const notifications = user.notifications;

  res.status(200).json(notifications);

  } catch (error) {
     console.log(error);
     res.status(500).json({ message: "Internal server error" });
  }
}

const notificationsRead = async(req,res)=>{
  try {
    const userEmail = req.query.email;

    if (!userEmail) {
      return res.status(400).json({ message: "Email parameter is required" });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.notifications.forEach((notification) => {
        notification.read = true;
      });

      await user.save();
      
      res.status(200)
        .json({
          message: "All notifications marked as read",
        });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { login, register, getNotficationByEmail,notificationsRead };