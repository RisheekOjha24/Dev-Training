const { verifyToken } = require("../utils/token");

const authenticate = (req, res, next) => {
const token = req.cookies.tokenBook;

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    // Verify the token
    const decoded = verifyToken(token);
    req.user = decoded; // Attach the decoded payload to the request object
    next(); 
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
