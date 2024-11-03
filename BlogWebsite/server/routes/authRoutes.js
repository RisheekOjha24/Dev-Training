const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();
const {
  login,
  register,
  getNotficationByEmail,
  notificationsRead,
} = require("../controller/authApi");

// actual url will be /api/auth/login
router.post("/login", login);
router.post("/register",register);

router.get("/notifications",getNotficationByEmail);
router.get("/notificationsRead",notificationsRead);
module.exports = router;
