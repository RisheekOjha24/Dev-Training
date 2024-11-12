const jwt = require('jsonwebtoken');
const secret = "BlackOps";

const decoded = (req, res, next) => {
  const token = req.cookies.uuid; // Corrected to `req.cookies` (plural)
  if (!token) {
    // No token found, send a 401 Unauthorized response
    return res.status(401).send('Token not provided');
  }

  jwt.verify(token, secret, (err, decodedData) => {
    if (err) {
      // If there is an error, send a 401 Unauthorized response
      return res.status(401).send(err);
    }

    // If token is valid, store the decoded data in the request object
    req.user = decodedData;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = decoded;
