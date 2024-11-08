// multer.middleware.js
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // directory name to save the uploaded files
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Specify the filename format (e.g., original name + timestamp)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); 
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Creating the multer upload middleware
const upload = multer({ storage: storage });

module.exports = upload;
