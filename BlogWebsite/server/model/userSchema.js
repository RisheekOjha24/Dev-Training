const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isSuspended: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  notifications: [
    {
      message: { type: String, required: true },
      date: { type: Date, default: Date.now },
      read: { type: Boolean, default: false },
    },
  ],
});


module.exports = mongoose.model("User", UserSchema);
