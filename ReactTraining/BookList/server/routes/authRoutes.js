const express = require("express");
const router = express.Router();

const {signin,signup} = require("../controllers/authAPI");

// /auth
router.post("/signup", signup);
router.post("/signin", signin);

module.exports=router;