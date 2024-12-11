const jwt = require("jsonwebtoken");

const generateToken = (user) => {

  const payload = {
    id: user._id,
    useremail: user.useremail,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET || "ROM", {
    expiresIn: "1h",
  });

  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "ROM");
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = { generateToken, verifyToken };