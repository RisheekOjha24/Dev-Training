const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  coverImageUrl: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
