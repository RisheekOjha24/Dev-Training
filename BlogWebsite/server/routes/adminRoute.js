const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();
const {
  getAllUsers,
  suspendUser,
  notifyUser,
} = require("../controller/adminApi");

//  /api/admin
router.get('/',(req,res)=>res.send("Working fine admin API"));

router.get('/allUsers',getAllUsers);

router.put('/suspend',suspendUser);

router.post('/notify',notifyUser);

module.exports=router;