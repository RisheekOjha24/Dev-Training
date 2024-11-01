// multer.middleware.js
const multer = require("multer");
const path = require("path");

// Set up disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory to save the uploaded files
    cb(null, "uploads/"); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    // Specify the filename format (e.g., original name + timestamp)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Create the multer upload middleware
const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = upload;
